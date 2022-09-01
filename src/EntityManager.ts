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

interface StorageModel {
  [key: number|string]: any
}

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

interface WorkingField {
  type: 'storage' | 'updated' | 'pending'
  value: any
}

interface WorkingModel {
  [key: string]: WorkingField
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
  refresh: (model: BaseModel, storageModel: StorageModel, pk: number|string, done: () => void) => any
  cancelRefresh: (model: BaseModel, storageModel: StorageModel, pk: number|string) => any
}

export default class EntityManager {
  models: Models
  repositories: Repositories
  storage: Storage
  cache: Cache
  hooks: Hooks
  pending: any
  defaultClasses: Classes

  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.cache = {}
    this.pending = null
    this.hooks = {
      refresh: () => {
        throw new Error('Set refresh hook')
      },
      cancelRefresh: () => {
        throw new Error('Set cancelRefresh hook')
      },
    }
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
  setStorage(model: BaseModel, pk: number | string, value: StorageItem): void {
    const storageModel = this.getStorageModel(model.getName())
    const property = Object.entries(value).reduce((acc: PropertyDescriptorMap, [key, subValue]) => {
      acc[key] = {
        enumerable: true,
        configurable: true,
        writable: true,
        value: subValue
      }
      return acc
    }, {})
    storageModel[pk] = Object.create(model, property)
  }
  async flush() {
  }
  _createProxy(model: BaseModel, pk: string|number, cb: (done: () => void) => void, hasRefresh: Boolean = true): any {
    const storageModel = this.getStorageModel(model.getName())
    const done = () => {
    }
    if (hasRefresh) {
      model.refresh(storageModel, pk, done)
    }
    const em = this
    let proxyTarget = storageModel[pk];
    if (typeof proxyTarget === 'undefined') {
      em.setStorage(model, pk, {})
    }
    return new Proxy(storageModel[pk], {
      get(target, prop: string, receiver) {
        if (prop === 'cancelRefresh') {
          return () => model.cancelRefresh(storageModel, pk)
        }
        if (prop in target) {
          const storage = storageModel[pk]
          if (typeof storage !== 'undefined' && !BaseField.prototype.isPrototypeOf(storage[prop])) {
            const convertedStorage = model.validateFields(storage).convertFields(storage)
            return Reflect.get(convertedStorage, prop, receiver)
          }
          cb(done)
          return em.pending
        } else {
          return Reflect.get(target, prop, receiver)
        }
      },
      set(target: WorkingModel, prop: string, value: any, receiver: any): boolean {
        if (prop in target) {
          throw new Error('Use update method')
        } else {
          Reflect.set(target, prop, value, receiver)
        }
        return true
      }
    })
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
        em.setStorage(targetModel, pk, result)
        done()
      })
    }), {
      get(target: WorkingModel[], prop: string, receiver: any): any {
        if (['push', 'pop', 'shift', 'unshift'].includes(prop)) {
          throw new Error('Use update method')
        }
        return Reflect.get(target, prop, receiver)
      }
    })
  }
}