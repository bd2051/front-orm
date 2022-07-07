import BaseType from "./BaseType";

export default class Collection extends BaseType{
  convertResult(result, em, model, repository) {
    if (!Array.isArray(result)) {
      throw new Error('Invalid result. The result must be array')
    }
    if (result.some(item => !item[model.getPk()])) {
      throw new Error('Invalid result. Missing primary key')
    }
    result.forEach((item) => {
      em.storage[model.getName()][item[model.getPk()]] = item
    })
    return result.map((item) =>
      new Proxy(model,{
        async get(target, prop, receiver) {
          if (typeof em.storage[model.getName()][item[model.getPk()]] !== 'undefined') {
            return Reflect.get(em.storage[model.getName()][item[model.getPk()]], prop, receiver)
          }
          this.em.storage[model.getName()][item[model.getPk()]] = await target.findByPk(model.getPk())
          return Reflect.get(em.storage[model.getName()][item[model.getPk()]], prop, receiver)
        }
      })
    )
  }
}
