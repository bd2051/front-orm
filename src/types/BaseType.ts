import EntityManager from "../EntityManager";
import BaseModel from "../model/BaseModel";

interface Storage {
  [key: number|string]: object
}

export default class BaseType {
  em: EntityManager
  findCb: (values: any) => object
  find: (values: any, model: BaseModel) => Promise<any>

  constructor(em: EntityManager, findCb: (values: any) => object) {
    this.em = em
    this.findCb = findCb
    this.find = async (values, model) => {
      const result = await findCb(values)
      return this.convertResult(result, model)
    }
  }
  setEntityManager(em: EntityManager) {
    this.em = em
  }
  convertResult(result: object, model: BaseModel): object {
      if (typeof result === 'undefined') {
        throw new Error('add convertResult method')
      }
      if (typeof model === 'undefined') {
        throw new Error('add convertResult method')
      }
      return new Proxy({}, {})
  }
  getResultProxy(model: BaseModel, storageModel: Storage, value: number | string) {
    return this.em._createProxy(model, model, value, async () => {
      const result = await model.getRepository().methodsCb.findByPk(value)
      storageModel[value] = result
      return result
    })
  }
}