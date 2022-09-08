import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
import {Model} from "../types";

export default class CollectionField extends BaseField implements FieldInterface {
  targetModelName: string
  convertValueToPk: (value: any) => number|string

  constructor(
      em: EntityManager,
      targetModelName: string,
      convertValueToPk: (value: any) => number|string = (value) => value,
  ) {
    super(em);
    this.targetModelName = targetModelName
    this.convertValueToPk = convertValueToPk
  }
  get targetModel(): Model {
    return this.em.getModel(this.targetModelName)
  }
  validate(value: any) {
    if (!Array.isArray(value)) {
      return false
    }
    // return value.every((element) => this.targetModel.getPkField().validate(this.convertValueToPk(element)))
    return true
  }
  convert(data: any, key: string) {
    const value = data[key]
    if (!Array.isArray(value)) {
      return false
    }
    return this.em._createArrayProxy(
      value,
      this.targetModel,
      this.convertValueToPk
    )
  }
}