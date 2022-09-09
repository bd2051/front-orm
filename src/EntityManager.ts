import {
  Repository,
  getBaseModel,
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
import {BaseModel, Model, ModelData, ModelInit, ModelView} from "./types";

interface Models {
  [key: string]: Model
}

interface RepositoryInit {
  findByPk: Entity
  [key: string]: BaseType
}

interface Repositories {
  [key: string]: Repository
}

interface StorageItem {
  [key: string]: any
}

interface Cache {
  [key: string]: object
}

interface CommonClasses {
  [key: string]: typeof getBaseModel | typeof Repository
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

// interface Fields {
//   [key: string]: any
// }

// interface PutTarget {
//   [key: string]: string | number | BaseField | Fields | ((v?: any) => any)
//   getPkName: () => string
//   getName: () => string
//   validateFields: (v: any) => BaseModel
//   fields: Fields
//   _target: BaseModel
// }

interface Commit {
  cacheKey: object,
  diffs: Array<Diff<any, any>>
}

interface CacheKey {
  pk?: string | number
}

interface FirstLevelStorage {
  [key: string|number]: CacheKey
}

interface Storage {
  [key: string]: FirstLevelStorage
}

export default class EntityManager {
  models: Models
  repositories: Repositories
  storage: Storage
  cache: Cache
  commits: Array<Commit>
  storageCache: WeakMap<CacheKey, ModelData>
  reverseStorageCache: WeakMap<ModelData, CacheKey>
  hooks: Hooks
  pending: any
  defaultClasses: Classes

  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.reverseStorageCache = new WeakMap()
    const reverseStorageCache = this.reverseStorageCache
    this.storageCache = new Proxy(new WeakMap(), {
      get(target: WeakMap<any, any>, prop: string | symbol, receiver: any): any {
        if (prop === 'set') {
          return (key: any, value: any) => {
            reverseStorageCache.set(value, key)
            return target.set.call(target, key, value)
          }
        }
        if (prop === 'get') {
          return target.get.bind(target)
        }
        return Reflect.get(target, prop, receiver)
      }
    })
    this.cache = {}
    this.commits = []
    this.pending = null
    this.hooks = {}
    this.defaultClasses = {
      common: {
        getBaseModel,
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
  setModel(getModelInit: (em: EntityManager) => ModelInit, repositories: RepositoryInit) {
    const baseModel: BaseModel = getBaseModel(this)
    const modelInit = getModelInit(this)
    const model: Model = Object.create(baseModel, this._convertValueToPropertyDescriptorMap(Object.entries(modelInit)))
    model.$setName(getModelInit.name)
    this.storage[model.$getName()] = {}
    this.models[model.$getName()] = model
    this.repositories[model.$getName()] = new Repository(this, model, repositories)
  }
  getModel(modelName: string): Model {
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
  setStorageValue(model: Model, pk: number | string, value: StorageItem): ModelData {
    const storageModel = this.getStorageModel(model.$getName())
    let storageCacheKey = storageModel[pk]
    if (typeof storageCacheKey === 'undefined') {
      storageModel[pk]  = {
        pk
      }
      storageCacheKey = storageModel[pk]!
    }
    const linkedValue = Object.entries(value).reduce((acc: StorageItem, [key, subValue]) => {
      if (typeof model[key] !== 'undefined') {
        acc[key] = model[key]!.link(subValue)
      }
      return acc
    }, {})
    const property = this._convertValueToPropertyDescriptorMap(Object.entries(linkedValue))
    this.storageCache.set(storageCacheKey, Object.create(model, property))
    return this.storageCache.get(storageCacheKey)!
  }
  _convertValueToPropertyDescriptorMap(entries: Array<Array<any>>) {
    return entries.reduce((acc: PropertyDescriptorMap, [key, value]) => {
      acc[key] = {
        enumerable: true,
        configurable: false,
        writable: true,
        value: value
      }
      return acc
    }, {})
  }
  put(value: PutValue, target: ModelView | Model) {
    let cacheKey = {}
    let cacheValue = {}
    if (typeof target._target !== undefined) {
      const modelView = target as ModelView
      cacheKey = this.reverseStorageCache.get(modelView._target)!
      cacheValue = {...target._target}
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
      this.storageCache.set(cacheKey, Object.create(target))
      changingTarget = this.storageCache.get(cacheKey)
    }
    diffs.forEach(function (change: Diff<any, any>) {
      applyChange(changingTarget, true, change);
    });
    this.storageCache.set(cacheKey, changingTarget!)

    return this._createProxyByCacheKey(
      cacheKey
    )
  }
  async flush() {
    console.log(this.commits)
    // flush hooks common
    const map = this.commits.reduce((acc: Map<any, any>, commit) => {
      if (!acc.get(commit.cacheKey)) {
        acc.set(commit.cacheKey, commit)
      } else {
        commit.diffs.forEach((change) => {
          acc.get(commit.cacheKey).diffs.push(change)
        })
      }
      return acc
    }, new Map())
    map.forEach((commit, cacheKey) => {
      const item = {}
      const method = cacheKey.pk ? 'PUT' : 'POST'
      commit.diffs.forEach(function (change: Diff<any, any>) {
        applyChange(item, true, change);
      });
      console.log(item, commit, method)
    })
  }
  _createProxyByCacheKey(
    cacheKey: object,
    cb = (done: () => void) => {done()},
    done = () => {}
  ): ModelView {
    const em = this
    const modelData = this.storageCache.get(cacheKey) as unknown as ModelView
    console.log('qwe', modelData)
    return new Proxy(modelData, {
      get(target, prop: string, receiver) {
        if (prop === '_target') {
          return target
        }
        if (prop in target) {
          const storageCacheValue = em.storageCache.get(cacheKey)
          if (typeof storageCacheValue === 'undefined') {
            throw new Error('Logic error')
          }
          if (!(storageCacheValue[prop] as any instanceof BaseField)) {
            const model = Object.getPrototypeOf(target) as Model
            return model[prop]!.view(storageCacheValue[prop])
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
  _createProxy(model: Model, pk: string|number, cb: (done: () => void) => void): ModelView {
    const storageModel = this.getStorageModel(model.$getName())
    const done = () => {
    }
    let proxyTarget = storageModel[pk];
    if (typeof proxyTarget === 'undefined') {
      this.setStorageValue(model, pk, {})
    }
    return this._createProxyByCacheKey(
      storageModel[pk]!,
      cb,
      done
    )
  }
}