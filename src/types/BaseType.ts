import EntityManager from "../EntityManager";
import BaseModel from "../model/BaseModel";

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
  convertResult(result: object, model: BaseModel): any {
        console.warn(result, model, 'add convertResult method')
      return new Proxy({}, {})
  }
  getResultProxy(model: BaseModel, value: number | string) {
    return this.em._createProxy(model, value, async (done) => {
      const result = await model.getRepository().methodsCb.findByPk(value)
      this.em.setStorage(model, value, result)
      done()
    })
  }
}