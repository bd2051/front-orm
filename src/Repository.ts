import BaseType from "./types/BaseType";
import EntityManager from "./EntityManager";
import {Model} from "./types";

interface Repositories {
  [key: string]: BaseType
}

export default class Repository {
  [key: string]: Model | EntityManager | BaseType | ((v: any, o1?: any, o2?: any) => any)
  model: Model
  em: EntityManager

  constructor(em: EntityManager, model: Model, repositories: Repositories) {
    this.model = model
    this.em = em
    Object.entries(repositories).forEach(([methodName, repository]) => {
      repository.setEntityManager(em)
      this[methodName] = (values: any) => this._methodsHandler(values, repository)
    })
  }

  async refreshCollection(collection: Array<any>) {
    const meta = this.em.collectionCache.get(collection)
    if (typeof meta === 'undefined') {
      return
    }
    const result = await meta.method(meta.options, this.model)
    collection.splice(0, collection.length)
    result.forEach((el: any) => {
      collection.push(el)
    })
  }

  async _methodsHandler(values: any, methodRepository: BaseType) {
    const result = await methodRepository.find(values, this.model)
    this.em.collectionCache.set(result, {
      options: values,
      method: methodRepository.find,
      repository: this
    })
    this.em.onAddCollection(this, new WeakRef<Array<any>>(result))
    return result
  }
}