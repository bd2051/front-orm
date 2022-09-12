import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
import {Model, ModelData, ModelView} from "../types";

export default class EntityField extends BaseField implements FieldInterface {
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
  //   if (value === null) {
  //     return true
  //   }
  //   return this.targetModel.$getPkField().validate(this.convertValueToPk(value))
  // }
  // convert(data: any, key: string) {
  //   const value = data[key]
  //   if (value === null) {
  //     return null
  //   }
  //   const pk = this.convertValueToPk(value)
  //   const model = this.targetModel
  //   const findByPk = model.$getRepository().methodsCb.findByPk
  //   return this.em._createProxy(model, pk, async (done) => {
  //     const result = await findByPk(pk)
  //     this.em.setStorageValue(model, pk, result)
  //     done()
  //   })
  // }
  view(value: ModelData | null): ModelView | null {
    if (value === null) {
      return value
    }
    const cacheKey = this.em.reverseStorageCache.get(value)
    if (typeof cacheKey === 'undefined') {
      throw new Error('Logic error')
    }
    const pk = cacheKey.pk
    let cb = async (done: () => void) => { done() }
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
  }
  link(value: any): ModelData | null {
    console.log('link', value)
    if (value === null) {
      return null
    }
    const pk = this.convertValueToPk(value)
    const cacheKey = this.em.getStorageModel(this.targetModel.$getName())[pk]

    console.log('link2', value)
    if (typeof cacheKey === 'undefined') {
      return this.em.setStorageValue(this.targetModel, pk, {
        [this.targetModel.$getPkName()]: pk
      })
    }
    return this.em.storageCache.get(cacheKey)!
  }
}
