import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
import {Model, ModelData, ModelView} from "../types";

export default class CollectionField extends BaseField implements FieldInterface {
  targetModelName: string
  convertValueToPk: (value: any) => number|string

  constructor(
      em: EntityManager,
      targetModelName: string,
      convertValueToPk: (value: any) => number|string = (value) => value,
  ) {
    super(em);
    this.targetModelName = targetModelName
    this.convertValueToPk = convertValueToPk
  }
  get targetModel(): Model {
    return this.em.getModel(this.targetModelName)
  }
  // validate(value: any) {
  //   if (!Array.isArray(value)) {
  //     return false
  //   }
  //   // return value.every((element) => this.targetModel.getPkField().validate(this.convertValueToPk(element)))
  //   return true
  // }
  // convert(data: any, key: string) {
  //   const value = data[key]
  //   if (!Array.isArray(value)) {
  //     return false
  //   }
  //   return this.em._createArrayProxy(
  //     value,
  //     this.targetModel,
  //     this.convertValueToPk
  //   )
  // }
  view(values: Array<ModelData>): Array<ModelView> {
    return new Proxy(values.map((value) => {
      const cacheKey = this.em.reverseStorageCache.get(value)
      if (typeof cacheKey === 'undefined') {
        throw new Error('Logic error')
      }
      const pk = cacheKey.pk
      let cb = async (done: () => void) => {
        done()
      }
      if (typeof pk !== 'undefined') {
        const model = this.targetModel
        const findByPk = model.$getRepository().methodsCb.findByPk
        cb = async (done: () => void) => {
          const result = await findByPk(pk)
          this.em.setStorageValue(model, pk, result)
          done()
        }
      }
      return this.em._createProxyByCacheKey(cacheKey, cb)
    }), {
      get(target, prop: string, receiver: any): any {
        if (['push', 'pop', 'shift', 'unshift'].includes(prop)) {
          throw new Error('Use update method')
        }
        return Reflect.get(target, prop, receiver)
      }
    })
  }
  link(values: any): any {
    return values.map((value: any) => this.em.setStorageValue(this.targetModel, this.convertValueToPk(value), value))
  }
}