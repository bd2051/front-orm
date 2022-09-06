import {
  Repository,
  BaseModel,
  BaseType,
  BaseField,
  Entity,
  BooleanField,
  Collection,
  EntityField,
  NumberField,
  PrimaryKey,
  StringField,
  CollectionField
} from "./index";
import {applyChange, diff, Diff} from "deep-diff";

interface Models {
  [key: string]: BaseModel
}

interface RepositoryInit {
  findByPk: Entity
  [key: string]: BaseType
}

interface Repositories {
  [key: string]: Repository
}

interface FirstLevelStorage {
  [key: string|number]: any
}

interface Storage {
  [key: string]: FirstLevelStorage
}

interface StorageItem {
  [key: string]: any
}

interface Cache {
  [key: string]: object
}

interface CommonClasses {
  [key: string]: typeof BaseModel | typeof Repository
}

interface FieldsClass {
  [key: string]: typeof BaseField | typeof EntityField | typeof CollectionField
}

interface TypesClass {
  [key: string]: typeof BaseType
}

interface Classes {
  common: CommonClasses
  fields: FieldsClass
  types: TypesClass
}

interface Hooks {
}

interface PutValue {
  [key: string]: any
}

interface Fields {
  [key: string]: any
}

interface PutTarget {
  [key: string]: string | number | BaseField | Fields | ((v?: any) => any)
  getPkName: () => string
  getName: () => string
  validateFields: (v: any) => BaseModel
  fields: Fields
}

interface Commit {
  cacheKey: object,
  diffs: Array<Diff<any, any>>
}

export default class EntityManager {
  models: Models
  repositories: Repositories
  storage: Storage
  cache: Cache
  commits: Array<Commit>
  storageCache: WeakMap<any, any>
  hooks: Hooks
  pending: any
  defaultClasses: Classes

  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.storageCache = new WeakMap()
    this.cache = {}
    this.commits = []
    this.pending = null
    this.hooks = {}
    this.defaultClasses = {
      common: {
        BaseModel,
        Repository,
      },
      fields: {
        BooleanField,
        NumberField,
        PrimaryKey,
        StringField,
        EntityField,
        CollectionField
      },
      types: {
        Collection,
        Entity
      }
    }
  }
  setHooks(hooks: Hooks) {
    this.hooks = hooks
  }
  setModel(model: BaseModel, repositories: RepositoryInit) {
    this.storage[model.getName()] = {}
    this.models[model.getName()] = model
    this.repositories[model.getName()] = new Repository(this, model, repositories)
  }
  getModel(modelName: string): BaseModel {
    const model = this.models[modelName]
    if (typeof model === 'undefined') {
      throw new Error('The model does not exist')
    }
    return model
  }
  getRepository(modelName: string): Repository {
    const repository = this.repositories[modelName]
    if (typeof repository === 'undefined') {
      throw new Error('The model does not exist')
    }
    return repository
  }
  getStorageModel(modelName: string): FirstLevelStorage {
    const storageModel = this.storage[modelName]
    if (typeof storageModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    return storageModel
  }
  setStorageValue(model: BaseModel, pk: number | string, value: StorageItem): void {
    const storageModel = this.getStorageModel(model.getName())
    let storageCacheKey = storageModel[pk]
    if (typeof storageCacheKey === 'undefined') {
      storageModel[pk] = {
        pk
      }
      storageCacheKey = storageModel[pk]
    }
    const property = Object.entries(value).reduce((acc: PropertyDescriptorMap, [key, subValue]) => {
      acc[key] = {
        enumerable: true,
        configurable: true,
        writable: true,
        value: subValue
      }
      return acc
    }, {})
    this.storageCache.set(storageCacheKey, Object.create(model, property))
  }
  put(value: PutValue, target: PutTarget | BaseModel) {
    let cacheKey = {}
    let cacheValue = {}
    const pk = target[target.getPkName()]
    if (!(pk instanceof BaseField)) {
      if (!(typeof pk === 'number' || typeof pk === 'string')) {
        throw new Error('Logic error')
      }
      const storageModel = this.getStorageModel(target.getName())
      cacheKey = storageModel[pk]
      if (typeof cacheKey === 'undefined') {
        cacheKey = {
          pk
        }
      }
      cacheValue = {...target}
    }

    const diffs = diff(cacheValue, {
      ...cacheValue,
      ...value
    })

    if (typeof diffs === 'undefined') {
      return
    }

    this.commits.push({
      cacheKey,
      diffs
    })

    let changingTarget = this.storageCache.get(cacheKey)
    if (typeof changingTarget === 'undefined') {
      this.storageCache.set(cacheKey, {})
      changingTarget = this.storageCache.get(cacheKey)
    }
    diffs.forEach(function (change: Diff<any, any>) {
      console.log(changingTarget.age, change)
      applyChange(changingTarget, true, change);
      console.log(changingTarget.age, change)
    });
    this.storageCache.set(cacheKey, changingTarget)

    console.log(changingTarget, cacheKey, this.storageCache.get(cacheKey))

    return this._createProxyByCacheKey(
      cacheKey,
      target
    )
  }
  async flush() {
    console.log(this.commits)
  }
  _createProxyByCacheKey(
    cacheKey: object,
    model: PutTarget | BaseModel,
    cb = (done: () => void) => {done()},
    done = () => {}
  ) {
    const em = this
    return new Proxy(this.storageCache.get(cacheKey), {
      get(target, prop: string, receiver) {
        if (model.fields[prop]) {
          const storageCacheKey = cacheKey
          const storageCacheValue = em.storageCache.get(storageCacheKey)
          if (typeof storageCacheKey !== 'undefined' && !BaseField.prototype.isPrototypeOf(storageCacheValue[prop])) {
            const convertedStorage = model.validateFields(storageCacheValue).convertFields(storageCacheValue)
            return Reflect.get(convertedStorage, prop, receiver)
          }
          cb(done)
          return em.pending
        } else {
          return Reflect.get(target, prop, receiver)
        }
      },
      set(target, prop: string, value: any, receiver: any): boolean {
        if (prop in target) {
          throw new Error('Use update method')
        } else {
          Reflect.set(target, prop, value, receiver)
        }
        return true
      }
    })
  }
  _createProxy(model: BaseModel, pk: string|number, cb: (done: () => void) => void): any {
    const storageModel = this.getStorageModel(model.getName())
    const done = () => {
    }
    let proxyTarget = storageModel[pk];
    if (typeof proxyTarget === 'undefined') {
      this.setStorageValue(model, pk, {})
    }
    return this._createProxyByCacheKey(
      storageModel[pk],
      model,
      cb,
      done
    )
  }
  _createArrayProxy(
    arrayTarget: Array<number|string>,
    targetModel: BaseModel,
    convertValueToPk: (value: any) => number | string
  ): any {
    const em = this
    return new Proxy(arrayTarget.map((value) => {
      const pk = convertValueToPk(value)
      const findByPk = targetModel.getRepository().methodsCb.findByPk
      return this._createProxy(targetModel, pk, async (done) => {
        const result = await findByPk(pk)
        em.setStorageValue(targetModel, pk, result)
        done()
      })
    }), {
      get(target, prop: string, receiver: any): any {
        if (['push', 'pop', 'shift', 'unshift'].includes(prop)) {
          throw new Error('Use update method')
        }
        return Reflect.get(target, prop, receiver)
      }
    })
  }
}