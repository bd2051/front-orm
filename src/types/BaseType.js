export default class BaseType {
  constructor(findCb) {
    this.find = async (values, em, model, repository) => {
      const result = await findCb(values)
      return this.convertResult(result, em, model, repository)
    }
  }
  convertResult(result, em, model, repository) {
    throw new Error('add convertResult method')
  }
}