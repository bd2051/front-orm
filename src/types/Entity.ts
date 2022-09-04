import BaseType from "./BaseType";
import BaseModel from "../model/BaseModel";

interface Result {
  [key: string|number]: any
}

export default class Entity extends BaseType {
  convertResult(result: Result, model: BaseModel) {
    const pkValue = result[model.getPkName()]
    if (typeof pkValue === 'undefined') {
      throw new Error('Invalid result. Missing primary key')
    }
    this.em.setStorageValue(model, pkValue, result)
    return this.getResultProxy(model, pkValue)
  }
}
