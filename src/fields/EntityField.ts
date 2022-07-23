import BaseField from "./BaseField";
import BaseModel from "../model/BaseModel";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";

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
  get targetModel(): BaseModel {
    return this.em.getModel(this.targetModelName)
  }
  validate(value: any) {
    if (value === null) {
      return true
    }
    return this.targetModel.getPkField().validate(value)
  }
  convert(value: any) {
    if (value === null) {
      return null
    }
    const pk = this.convertValueToPk(value)
    let storageModel = this.em.getStorageModel(this.targetModel.getName())
    const model = this.targetModel
    const findByPk = model.getRepository().methodsCb.findByPk
    return this.em._createProxy(model, pk, async (done) => {
      storageModel[pk] = await findByPk(pk)
      done()
    })
  }
}
