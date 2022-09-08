import BaseType from "./BaseType";
import {Model} from "../types";

interface Result {
  [key: string|number]: any
}

export default class Entity extends BaseType {
  convertResult(result: Result, model: Model) {
    const pkValue = result[model.$getPkName()]
    if (typeof pkValue === 'undefined') {
      throw new Error('Invalid result. Missing primary key')
    }
    this.em.setStorageValue(model, pkValue, result)
    return this.getModelView(model, pkValue)
  }
}
