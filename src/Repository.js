import BaseType from "./types/BaseType";
import getUuidByString from "uuid-by-string";

export default class Repository {
  constructor(em, model, repositories = []) {
    this.model = model
    this.em = em
    this.methodsCb = {}
    if (!Object.keys(repositories).includes('findByPk')) {
      throw new Error('The repository must have a method findByPk')
    }
    Object.keys(repositories).forEach((methodName) => {
      if (!repositories[methodName] instanceof BaseType) {
        throw new Error('invalid type')
      }
      repositories[methodName].setEntityManager(em)
      this[methodName] = (values) => this._methodsHandler(values, repositories[methodName], methodName)
      this.methodsCb[methodName] = repositories[methodName].findCb
    })
  }

  _sortJsonStringify(obj)
  {
      const allKeys = new Set();
      JSON.stringify(obj, (key) => allKeys.add(key));
      return JSON.stringify(obj, Array.from(allKeys).sort());
  }

  async _methodsHandler(values, methodRepository, methodName) {
    const uuid = getUuidByString(methodName + this._sortJsonStringify(values))
    if (!this.em.cache[uuid]) {
      this.em.cache[uuid] = await methodRepository.find(values, this.model)
    }
    return this.em._createProxy(this.em.cache[uuid], this.em.cache[uuid], async () => {
      this.em.cache[uuid] = await methodRepository.find(values, this.model)
    })
  }
}