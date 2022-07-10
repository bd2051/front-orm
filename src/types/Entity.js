import BaseType from "./BaseType";

export default class Entity extends BaseType {
  convertResult(result, model) {
    if (typeof result[model.getPk()] === 'undefined') {
      throw new Error('Invalid result. Missing primary key')
    }
    this.em.storage[model.getName()][result[model.getPk()]] = model.validateFields(result).convertFields(result)
    return this.getResultProxy(model, this.em.storage[model.getName()], result[model.getPk()])
  }
}
