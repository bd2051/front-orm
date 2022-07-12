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

const PROPERTY_EXCEPTIONS = [
  'then',
  'catch',
  'finally'
]

export default class EntityManager {
  models: Models
  repositories: Repositories
  storage: Storage
  cache: Cache

  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.cache = {}
  }
  setModel(model: BaseModel, repositories: RepositoryInit) {
    this.storage[model.getName()] = {}
    this.models[model.getName()] = model
    this.repositories[model.getName()] = new Repository(this, model, repositories)
  }
  _createProxy(proxyTarget: object, storage: object | undefined, cb: () => object) {
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