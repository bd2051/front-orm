import BaseType from "./types/BaseType";
import getUuidByString from "uuid-by-string";

export default class Repository {
  constructor(em, model, repositories = []) {
    this.model = model
    this.em = em
    if (!Object.keys(repositories).includes('findByPk')) {
      throw new Error('The repository must have a method findByPk')
    }
    Object.keys(repositories).forEach((methodName) => {
      if (!repositories[methodName] instanceof BaseType) {
        throw new Error('invalid type')
      }
      this[methodName] = (values) => this._methodsHandler(values, repositories[methodName], methodName)
    })
  }

  sortJsonStringify(obj)
  {
      const allKeys = new Set();
      JSON.stringify(obj, (key) => allKeys.add(key));
      return JSON.stringify(obj, Array.from(allKeys).sort());
  }

  async _methodsHandler(values, methodRepository, methodName) {
    const cache = this.em.cache
    const uuid = getUuidByString(methodName + this.sortJsonStringify(values))
    if (!cache[uuid]) {
      cache[uuid] = await methodRepository.find(values, this.em, this.model, this)
    }
    return new Proxy(cache[uuid],{
      async get(target, prop, receiver) {
        if (typeof cache[uuid] !== 'undefined') {
          return Reflect.get(cache[uuid], prop, receiver)
        }
        cache[uuid] = await methodRepository.find(values, this.em, this.model)
        return Reflect.get(cache[uuid], prop, receiver)
      }
    })
  }

  // async find(pk) {
  //
  //   if (!storage[pk]) {
  //     storage[pk] = await this.model.find(pk)
  //   }
  //   return new Proxy(this.model,{
  //     async get(target, prop, receiver) {
  //       console.log('storage[pk]', storage[pk])
  //       if (typeof storage[pk] !== 'undefined') {
  //         return Reflect.get(storage[pk], prop, receiver)
  //       }
  //       console.log(target)
  //       storage[pk] = await target.find(pk)
  //       return Reflect.get(storage[pk], prop, receiver)
  //     }
  //   })
  // }
}