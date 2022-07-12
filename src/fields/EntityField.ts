import BaseField from "./BaseField";
import BaseModel from "../model/BaseModel";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";

export default class EntityField extends BaseField implements FieldInterface {
  targetModelName: string

  constructor(em: EntityManager, targetModelName: string) {
    super(em);
    this.targetModelName = targetModelName
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
    let storageModel = this.em.storage[this.targetModel.getName()]
    if (typeof storageModel === 'undefined') {
      throw new Error('Invalid target in Entity field')
    }
    const model = this.targetModel
    const findByPk = model.getRepository().methodsCb.findByPk
    return this.em._createProxy(model, storageModel[value], async () => {
        const result = await findByPk(value)
        if (typeof storageModel === 'undefined') {
          throw new Error('Logic error')
        }
        storageModel[value] = model.validateFields(result).convertFields(result)
        return storageModel[value]
    })
  }
}
