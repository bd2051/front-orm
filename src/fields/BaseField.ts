import EntityManager from "../EntityManager";

export default class BaseField {
  em: EntityManager

  constructor(em: EntityManager) {
    this.em = em
  }
  convert(value: any): any {
    return value
  }
  validate(value: any): any {
    if (!value) {
      throw new Error('Logic error')
    }
    return this
  }
}
