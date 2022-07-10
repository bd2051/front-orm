import BaseField from "./BaseField";

export default class EntityField extends BaseField{
  constructor(model, targetModelName) {
    super();
    this.model = model
    this.targetModelName = targetModelName
  }
  get targetModel() {
    return this.model.em.models[this.targetModelName]
  }
  validate(value) {
    return this.targetModel[this.targetModel.getPk()].validate(value)
  }
  convert(value) {
    if (value === null) {
      return null
    }
    let storageModel = this.em.storage[this.targetModel.getName()]
    const model = this.targetModel
    return this.em._createProxy(model, storageModel[value], async () => {
        const result = await model.getRepository().methodsCb.findByPk(value)
        storageModel[value] = model.validateFields(result).convertFields(result)
    })
  }
}
