import EntityManager from "../EntityManager";
import {BaseRepository, Model} from "../types";
import BaseType from "../types/BaseType";
import Collection from "../types/Collection";

export default (em: EntityManager, model: Model) : BaseRepository => Object.create({}, {
  $em: {
    writable: false,
    configurable: false,
    enumerable: false,
    value: em
  },
  $model: {
    writable: false,
    configurable: false,
    enumerable: false,
    value: model
  },
  $refreshCollection: {
    writable: false,
    configurable: false,
    enumerable: false,
    async value(collection: Array<any>) {
      const meta = this.$em.collectionCache.get(collection)
      if (typeof meta === 'undefined') {
        return
      }
      const result = await meta.method(meta.options, this.$model)
      collection.splice(0, collection.length)
      result.forEach((el: any) => {
        collection.push(el)
      })
    }
  },
  _methodsHandler: {
    writable: false,
    configurable: false,
    enumerable: false,
    async value(values: any, methodRepository: BaseType) {
      const result = await methodRepository.find(values, this.$model)
      const data = this.$em._setReactivity(result)
      if (methodRepository instanceof Collection) {
        this.$em.collectionCache.set(data, {
          options: values,
          method: methodRepository.find,
          repository: this
        })
        this.$em.onAddCollection(this, new WeakRef<Array<any>>(data))
      }
      return data
    }
  }
})
