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
    const storageModel = this.em.storage[model.getName()]
    if (typeof storageModel === 'undefined') {
      throw new Error('Invalid storageModel')
    }
    storageModel[pkValue] = result
    return this.getResultProxy(model, storageModel, pkValue)
  }
}
