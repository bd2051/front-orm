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

  create(values: any) {
    const uuid = getUuidByString(Date.now().toString())
    const model = this.model
    const createListModel = this.em.getCreateListModel(model.getName())
    createListModel[uuid] = values
    return this.em._createProxy(model, model, uuid, async () => {})
  }

  async delete(pk: number|string): Promise<any> {
    const model = this.model
    const deleteListModel = this.em.getDeleteListModel(model.getName())
    const storageModel = this.em.getStorageModel(model.getName())
    let item = storageModel[pk]
    if (typeof item === 'undefined') {
      item = await model.getRepository().methodsCb.findByPk(pk)
      storageModel[pk] = item
    }
    deleteListModel[pk] = item
    return this.em._createProxy(model, model, pk, async () => {
      const result = await model.getRepository().methodsCb.findByPk(pk)
      storageModel[pk] = result
      return result
    })
  }

  async _methodsHandler(values: any, methodRepository: BaseType, methodName: string) {
    const uuid = getUuidByString(methodName + this._sortJsonStringify(values))
    const cache = this.em.cache
    if (typeof cache[uuid] === 'undefined') {
      cache[uuid] = await methodRepository.find(values, this.model)
    }
    return this.em._createCacheProxy(cache[uuid]!, uuid, async () => {
      cache[uuid] = await methodRepository.find(values, this.model)
      return cache[uuid]
    })
  }
}