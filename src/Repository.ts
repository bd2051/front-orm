import BaseType from "./types/BaseType";
import getUuidByString from "uuid-by-string";
import EntityManager from "./EntityManager";
import {Model} from "./types";

interface MethodsCb {
  findByPk: (value: any) => object
  [key: string]: (value: any) => object
}

interface Repositories {
  [key: string]: BaseType
}

export default class Repository {
  [key: string]: Model | EntityManager | MethodsCb | BaseType | ((v: any, o1?: any, o2?: any) => any)
  model: Model
  em: EntityManager
  methodsCb: MethodsCb

  constructor(em: EntityManager, model: Model, repositories: Repositories) {
    this.model = model
    this.em = em
    this.methodsCb = {
      findByPk: (value) => value // TODO em.hooks
    }
    Object.entries(repositories).forEach(([methodName, repository]) => {
      repository.setEntityManager(em)
      this[methodName] = (values: any) => this._methodsHandler(values, repository, methodName)
      this.methodsCb[methodName] = repository.findCb
    })
  }

  _sortJsonStringify(obj: object)
  {
      const allKeys: Set<string> = new Set();
      JSON.stringify(obj, (key) => allKeys.add(key));
      return JSON.stringify(obj, Array.from(allKeys).sort());
  }

  async _methodsHandler(values: any, methodRepository: BaseType, methodName: string) {
    const uuid = getUuidByString(methodName + this._sortJsonStringify(values))
    const cache = this.em.cache
    if (typeof cache[uuid] === 'undefined') {
      cache[uuid] = await methodRepository.find(values, this.model)
    }
    return cache[uuid]
  }
}