import EntityManager from "../EntityManager";
import {Model, ModelView} from "../types";

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
  convertResult(result: object, model: Model): any {
    console.warn(result, model, 'add convertResult method')
    return new Proxy({}, {})
  }
  getModelView(model: Model, pk: number | string): ModelView {
    return this.em._createProxy(model, pk, async (done) => {
      const result = await model.$get(pk)
      this.em.setStorageValue(model, pk, result)
      done()
    })
  }
}