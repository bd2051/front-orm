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
  getResultProxy(model, storageTarget) {
    return new Proxy(model,{
      async get(target, prop, receiver) {
        if (prop === 'then') {
          return Reflect.get(target, prop, receiver);
        }
        if (typeof storageTarget !== 'undefined') {
          return Reflect.get(storageTarget, prop, receiver)
        }
        storageTarget = await target.getRepository().methodsCb.findByPk(model.getPk())
        return Reflect.get(storageTarget, prop, receiver)
      }
    })
  }
}