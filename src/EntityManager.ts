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
  cache: Cache

  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.updateList = {}
    this.createList = {}
    this.cache = {}
  }
  setModel(model: BaseModel, repositories: RepositoryInit) {
    this.storage[model.getName()] = {}
    this.updateList[model.getName()] = {}
    this.createList [model.getName()] = {}
    this.models[model.getName()] = model
    this.repositories[model.getName()] = new Repository(this, model, repositories)
  }
  flush() {
    Object.entries(this.updateList).forEach(([modelName, updateListModel]) => {
      const model = this.models[modelName]
      if (typeof model === 'undefined') {
        throw new Error('Logic error')
      }
      Object.entries(updateListModel).forEach(async ([pk, item]) => {
        await model.update(item)
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
  }
  _createProxy(proxyTarget: object, model: BaseModel, pk: string|number, cb: () => object) {
    const createListModel: List | undefined = this.updateList[model.getName()]
    if (typeof createListModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    const createList = createListModel[pk]
    const updateListModel: List | undefined = this.updateList[model.getName()]
    if (typeof updateListModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    const updateList = updateListModel[pk]
    const storageModel = this.storage[model.getName()]
    if (typeof storageModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    const storage = storageModel[pk]
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
        if (typeof createList !== 'undefined') {
          return Reflect.get(updateList, prop, receiver)
        }
        if (typeof updateList !== 'undefined') {
          return Reflect.get(updateList, prop, receiver)
        }
        if (typeof storage !== 'undefined') {
          return Reflect.get(storage, prop, receiver)
        }
        storageModel[pk] = await cb()
        return Reflect.get(storageModel[pk]!, prop, receiver)
      },
      set(target: object, prop: string, value: any, receiver: any): boolean {
        if (prop in target) {
          if (typeof updateList === 'undefined') {
            updateListModel[pk] = {
              prop: value
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