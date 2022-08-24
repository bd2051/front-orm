import BaseField from "./BaseField";
import BaseModel from "../model/BaseModel";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";

export default class CollectionField extends BaseField implements FieldInterface {
  targetModelName: string
  convertValueToPk: (value: any) => number|string
  model: BaseModel

  constructor(
      em: EntityManager,
      model: BaseModel,
      targetModelName: string,
      convertValueToPk: (value: any) => number|string = (value) => value,
  ) {
    super(em);
    this.targetModelName = targetModelName
    this.convertValueToPk = convertValueToPk
    this.model = model
  }
  get targetModel(): BaseModel {
    return this.em.getModel(this.targetModelName)
  }
  validate(value: any) {
    if (!Array.isArray(value)) {
      return false
    }
    return value.every((element) => this.targetModel.getPkField().validate(this.convertValueToPk(element)))
  }
  convert(data: any, key: string) {
    const value = data[key]
    if (!Array.isArray(value)) {
      return false
    }
    return this.em._createArrayProxy(
      value,
      this.model,
      this.targetModel,
      key,
      data[this.model.getPkName()],
      this.convertValueToPk
    )
  }
}