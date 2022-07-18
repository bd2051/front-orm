import Repository from "./Repository.js";
import BaseModel from "./model/BaseModel";
import BaseType from "./types/BaseType";

interface Models {
  [key: string]: BaseModel
}

interface RepositoryInit {
  findByPk: BaseType
  [key: string]: BaseType
}

interface Repositories {
  [key: string]: Repository
}

interface FirstLevelStorage {
  [key: string|number]: object
}

interface Storage {
  [key: string]: FirstLevelStorage
}

interface Cache {
  [key: string]: object
}

interface List {
  [key: string]: any
}

const PROPERTY_EXCEPTIONS = [
  'then',
  'catch',
  'finally'
]

export default class EntityManager {
  models: Models
  repositories: Repositories
  storage: Storage
  updateList: Storage
  createList: Storage
  deleteList: Storage
  cache: Cache

  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.updateList = {}
    this.createList = {}
    this.deleteList = {}
    this.cache = {}
  }
  setModel(model: BaseModel, repositories: RepositoryInit) {
    this.storage[model.getName()] = {}
    this.updateList[model.getName()] = {}
    this.createList [model.getName()] = {}
    this.deleteList [model.getName()] = {}
    this.models[model.getName()] = model
    this.repositories[model.getName()] = new Repository(this, model, repositories)
  }
  flush() {
    Object.entries(this.updateList).forEach(([modelName, updateListModel]) => {
      const model = this.models[modelName]
      if (typeof model === 'undefined') {
        throw new Error('Logic error')
      }
      const storageModel = this.storage[modelName]
      if (typeof storageModel === 'undefined') {
        throw new Error('Logic error')
      }
      Object.entries(updateListModel).forEach(async ([pk, item]) => {
        const storage = storageModel[pk]
        if (typeof storage === 'undefined') {
          throw new Error('Logic error')
        }
        await model.update(item, storage)
        delete updateListModel[pk]
      })
    })
    Object.entries(this.createList).forEach(([modelName, createListModel]) => {
      const model = this.models[modelName]
      if (typeof model === 'undefined') {
        throw new Error('Logic error')
      }
      Object.entries(createListModel).forEach(async ([pk, item]) => {
        await model.create(item)
        delete createListModel[pk]
      })
    })
    Object.entries(this.deleteList).forEach(([modelName, deleteListModel]) => {
      const model = this.models[modelName]
      if (typeof model === 'undefined') {
        throw new Error('Logic error')
      }
      Object.entries(deleteListModel).forEach(async ([pk, item]) => {
        await model.delete(pk, item)
        delete deleteListModel[pk]
      })
    })
  }
  _createProxy(proxyTarget: object, model: BaseModel, pk: string|number, cb: () => object) {
    const createListModel: List | undefined = this.createList[model.getName()]
    if (typeof createListModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    const updateListModel: List | undefined = this.updateList[model.getName()]
    if (typeof updateListModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    const storageModel = this.storage[model.getName()]
    if (typeof storageModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    model.refresh(storageModel, pk)
    return new Proxy(proxyTarget, {
      async get(target, prop: string, receiver) {
        if (prop === 'revert') {
          // удаление из updateList
        }
        if (prop === 'clear') {
          // очишение сторадже
        }
        if (PROPERTY_EXCEPTIONS.includes(prop)) {
          return Reflect.get(target, prop, receiver);
        }

        const createList = createListModel[pk]
        const updateList = updateListModel[pk]
        const storage = storageModel[pk]
        if (typeof createList !== 'undefined') {
          const convertedCreateList = model.validateFields(createList).convertFields(createList)
          return Reflect.get(convertedCreateList, prop, receiver)
        }
        if (typeof updateList !== 'undefined') {
          const convertedUpdateList = model.validateFields(updateList).convertFields(updateList)
          return Reflect.get(convertedUpdateList, prop, receiver)
        }
        if (typeof storage !== 'undefined') {
          const convertedStorage = model.validateFields(storage).convertFields(storage)
          return Reflect.get(convertedStorage, prop, receiver)
        }
        storageModel[pk] = await cb()
        const convertedStorage = model.validateFields(storageModel[pk]!).convertFields(storageModel[pk]!)
        return Reflect.get(convertedStorage, prop, receiver)
      },
      set(target: object, prop: string, value: any, receiver: any): boolean {
        if (prop in target) {
          const updateList = updateListModel[pk]
          if (typeof updateList === 'undefined') {
            updateListModel[pk] = {
              [prop]: value
            }
          } else {
            updateList[prop] = value
          }
        } else {
          Reflect.set(target, prop, value, receiver)
        }
        return true
      }
    })
  }
  _createCacheProxy(proxyTarget: object, storage: object | undefined, cb: () => object) {
    return new Proxy(proxyTarget, {
      async get(target, prop: string, receiver) {
        if (PROPERTY_EXCEPTIONS.includes(prop)) {
          return Reflect.get(target, prop, receiver);
        }
        if (typeof storage !== 'undefined') {
          return Reflect.get(storage, prop, receiver)
        }
        storage = await cb()
        return Reflect.get(storage, prop, receiver)
      }
    })
  }
}