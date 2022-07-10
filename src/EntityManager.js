import Repository from "./Repository.js";

const PROPERTY_EXCEPTIONS = [
  'then',
  'catch',
  'finally'
]

export default class EntityManager {
  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.cache = {}
  }
  setModel(model, repositories) {
    model.setEntityManager(this)
    this.storage[model.getName()] = {}
    this.models[model.getName()] = model
    this.repositories[model.getName()] = new Repository(this, model, repositories)
  }
  _createProxy(proxyTarget, storage, cb) {
    return new Proxy(proxyTarget, {
      async get(target, prop, receiver) {
        if (PROPERTY_EXCEPTIONS.includes(prop)) {
          return Reflect.get(target, prop, receiver);
        }
        if (typeof proxyTarget !== 'undefined') {
          return Reflect.get(storage, prop, receiver)
        }
        await cb()
        return Reflect.get(storage, prop, receiver)
      }
    })
  }
}