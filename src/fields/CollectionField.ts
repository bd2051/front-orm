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
  view(values: Array<ModelData>): Array<ModelView> {
    return new Proxy(values.map((value) => {
      const weakCacheKey = this.em.reverseStorageCache.get(value)
      if (typeof weakCacheKey === 'undefined') {
        throw new Error('Logic error')
      }
      const cacheKey = weakCacheKey.deref()
      if (typeof cacheKey === 'undefined') {
        throw new Error('Unexpected use of WeakRef')
      }
      const pk = cacheKey.pk
      let cb = async (done: () => void) => {
        done()
      }
      if (typeof pk !== 'undefined') {
        const model = this.targetModel
        cb = async (done: () => void) => {
          const result = await model.$get(pk)
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
  link(values: any): Array<ModelData> {
    return values.map((value: any) => {
      const pk = this.convertValueToPk(value)
      const cacheKey = this.em.getStorageModel(this.targetModel.$getName())[pk]
      if (typeof cacheKey === 'undefined') {
        return this.em.setStorageValue(this.targetModel, pk, {
          [this.targetModel.$getPkName()]: pk
        })
      }
      return this.em.storageCache.get(cacheKey)
    })
  }
}