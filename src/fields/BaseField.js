export default class BaseField {
  validate(value) {
    throw new Error('add validate method')
  }
  convert(value) {
    return value
  }
}
