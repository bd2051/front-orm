import BaseType from "./BaseType";

export default class Collection extends BaseType{
  convertResult(result, em, model, repository) {
    if (!Array.isArray(result)) {
      throw new Error('Invalid result. The result must be array')
    }
    if (result.some(item => !item[model.getPk()])) {
      console.log(model.getPk())
      throw new Error('Invalid result. Missing primary key')
    }
    result.forEach((item) => {
      em.storage[model.getName()][item[model.getPk()]] = model.validateFields(item).convertFields(item)
    })
    return result.map(item => this.getResultProxy(model, em.storage[model.getName()], item[model.getPk()]))
  }
}
