export default class BaseType {
  constructor(findCb) {
    this.em = null
    this.findCb = findCb
    this.find = async (values, model) => {
      const result = await findCb(values)
      return this.convertResult(result, model)
    }
  }
  setEntityManager(em) {
    this.em = em
  }
  convertResult(result, model) {
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
        storageModel[value] = model.validateFields(result).convertFields(result)
        return Reflect.get(storageModel[value], prop, receiver)
      }
    })
  }
}