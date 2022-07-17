import BaseType from "./BaseType";
import BaseModel from "../model/BaseModel";

interface Result {
  [key: string|number]: any
}

export default class Collection extends BaseType{
  convertResult(result: Array<Result>, model: BaseModel) {
    if (!Array.isArray(result)) {
      throw new Error('Invalid result. The result must be array')
    }
    if (result.some(item => !item[model.getPk()])) {
      throw new Error('Invalid result. Missing primary key')
    }
    const storageModel = this.em.storage[model.getName()]
    if (typeof storageModel === 'undefined') {
      throw new Error('Invalid storageModel')
    }
    result.forEach((item) => {
      storageModel[item[model.getPk()]] = item
    })
    return result.map(item => this.getResultProxy(model, storageModel, item[model.getPk()]))
  }
}
