import BaseType from "./BaseType";

export default class Entity extends BaseType{
  convertResult(result, em, model, repository) {
    if (typeof result[model.getPk()] === 'undefined') {
      throw new Error('Invalid result. Missing primary key')
    }
    em.storage[model.getName()][result[model.getPk()]] = result
    return new Proxy(model,{
      async get(target, prop, receiver) {
        if (typeof em.storage[model.getName()][result[model.getPk()]] !== 'undefined') {
          return Reflect.get(em.storage[model.getName()][result[model.getPk()]], prop, receiver)
        }
        this.em.storage[model.getName()][result[model.getPk()]] = await target.findByPk(model.getPk())
        return Reflect.get(em.storage[model.getName()][result[model.getPk()]], prop, receiver)
      }
    })
  }
}
