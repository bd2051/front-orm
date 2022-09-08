import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
import {Model} from "../types";

export default class EntityField extends BaseField implements FieldInterface {
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
    if (value === null) {
      return true
    }
    return this.targetModel.$getPkField().validate(this.convertValueToPk(value))
  }
  convert(data: any, key: string) {
    const value = data[key]
    if (value === null) {
      return null
    }
    const pk = this.convertValueToPk(value)
    const model = this.targetModel
    const findByPk = model.$getRepository().methodsCb.findByPk
    return this.em._createProxy(model, pk, async (done) => {
      const result = await findByPk(pk)
      this.em.setStorageValue(model, pk, result)
      done()
    })
  }
}
