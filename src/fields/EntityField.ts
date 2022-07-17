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
    if (!(this.em.models[this.targetModelName] instanceof BaseModel)) {
      throw new Error('Invalid target in Entity field')
    }
    return this.em.models[this.targetModelName]!
  }
  validate(value: any) {
    return this.targetModel.getPkField().validate(value)
  }
  convert(value: any) {
    if (value === null) {
      return null
    }
    const pk = this.convertValueToPk(value)
    let storageModel = this.em.storage[this.targetModel.getName()]
    if (typeof storageModel === 'undefined') {
      throw new Error('Invalid target in Entity field')
    }
    const model = this.targetModel
    const findByPk = model.getRepository().methodsCb.findByPk
    return this.em._createProxy(model, model, pk, async () => {
        const result = await findByPk(pk)
        if (typeof storageModel === 'undefined') {
          throw new Error('Logic error')
        }
        storageModel[pk] = result
        return storageModel[pk]
    })
  }
}
