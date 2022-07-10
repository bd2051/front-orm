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
    return new Proxy(model,{
      async get(target, prop, receiver) {
        if (prop === 'then') {
          return Reflect.get(target, prop, receiver);
        }
        if (typeof storageModel[value] !== 'undefined') {
          return Reflect.get(storageModel[value], prop, receiver)
        }
        const result = await target.getRepository().methodsCb.findByPk(value)
        storageModel[value] = model.validateFields(result).convertFields(result)
        return Reflect.get(storageModel[value], prop, receiver)
      }
    })
  }
}
