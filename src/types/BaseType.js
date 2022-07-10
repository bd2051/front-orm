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
    return this.em._createProxy(model, storageModel[value], async () => {
      const result = await model.getRepository().methodsCb.findByPk(value)
      storageModel[value] = model.validateFields(result).convertFields(result)
    })
  }
}