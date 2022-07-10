export default class BaseType {
  constructor(findCb) {
    this.findCb = findCb
    this.find = async (values, em, model, repository) => {
      const result = await findCb(values)
      return this.convertResult(result, em, model, repository)
    }
  }
  convertResult(result, em, model, repository) {
    throw new Error('add convertResult method')
  }
  getResultProxy(model, storageModel, value) {
    return new Proxy(model,{
      async get(target, prop, receiver) {
        if (prop === 'then') {
          return Reflect.get(target, prop, receiver);
        }
        if (typeof storageModel[value] !== 'undefined') {
          return Reflect.get(storageModel[value], prop, receiver)
        }
        const result = await target.getRepository().methodsCb.findByPk(value)
        console.log(model)
        storageModel[value] = model.validateFields(result).convertFields(result)
        return Reflect.get(storageModel[value], prop, receiver)
      }
    })
  }
}