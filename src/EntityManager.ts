import Repository from "./Repository.js";
import BaseModel from "./model/BaseModel";
import BaseType from "./types/BaseType";

interface Models {
  [key: string]: BaseModel
}

interface RepositoryInit {
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

interface UpdateList {
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
  cache: Cache

  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.updateList = {}
    this.cache = {}
  }
  setModel(model: BaseModel, repositories: RepositoryInit) {
    this.storage[model.getName()] = {}
    this.updateList[model.getName()] = {}
    this.models[model.getName()] = model
    this.repositories[model.getName()] = new Repository(this, model, repositories)
  }
  _createProxy(proxyTarget: object, model: BaseModel, pk: string|number, cb: () => object) {
    const updateListModel: UpdateList | undefined = this.updateList[model.getName()]
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
        if (PROPERTY_EXCEPTIONS.includes(prop)) {
          return Reflect.get(target, prop, receiver);
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
}