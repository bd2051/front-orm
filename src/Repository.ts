import BaseType from "./types/BaseType";
import getUuidByString from "uuid-by-string";
import BaseModel from "./model/BaseModel";
import EntityManager from "./EntityManager";

interface MethodsCb {
  findByPk: (value: any) => object
  [key: string]: (value: any) => object
}

interface Repositories {
  [key: string]: BaseType
}

export default class Repository {
  [key: string]: BaseModel | EntityManager | MethodsCb | BaseType | ((v: any, o1?: any, o2?: any) => any)
  model: BaseModel
  em: EntityManager
  methodsCb: MethodsCb

  constructor(em: EntityManager, model: BaseModel, repositories: Repositories) {
    this.model = model
    this.em = em
    this.methodsCb = {
      findByPk: (value) => ({value})
    }
    if (!Object.keys(repositories).includes('findByPk')) {
      throw new Error('The repository must have a method findByPk')
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
    const cacheUuid = cache[uuid]
    if  (typeof cacheUuid === 'undefined') {
      throw new Error('Invalid methodRepository')
    }
    return this.em._createProxy(cacheUuid, this.em.cache[uuid], async () => {
      cache[uuid] = await methodRepository.find(values, this.model)
    })
  }
}