import EntityManager from "../EntityManager";
import {Model} from "../types";

export default class BaseType {
  em: EntityManager
  findCb: (values: any) => object
  find: (values: any, model: Model) => Promise<any>

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
  convertResult(result: object, model: Model): any {
        console.warn(result, model, 'add convertResult method')
      return new Proxy({}, {})
  }
  getResultProxy(model: Model, value: number | string) {
    return this.em._createProxy(model, value, async (done) => {
      const result = await model.$getRepository().methodsCb.findByPk(value)
      this.em.setStorageValue(model, value, result)
      done()
    })
  }
}