import BaseType from "./BaseType";

export default class Entity extends BaseType {
  convertResult(result, em, model, repository) {
    if (typeof result[model.getPk()] === 'undefined') {
      throw new Error('Invalid result. Missing primary key')
    }
    em.storage[model.getName()][result[model.getPk()]] = model.validateFields(result).convertFields(result)
    return this.getResultProxy(model, em.storage[model.getName()], result[model.getPk()])
  }
}
