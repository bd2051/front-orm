export default class BaseField {
  constructor() {
    this.em = null
  }
  validate(value) {
    throw new Error('add validate method')
  }
  convert(value) {
    return value
  }
  setEntityManager(em) {
    this.em = em
  }
}
