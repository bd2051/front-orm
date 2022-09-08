import EntityManager from "../EntityManager";

export default class BaseField {
  em: EntityManager

  constructor(em: EntityManager) {
    this.em = em
  }
  convert(data: any, key: string): any { // TODO remove?
    return data[key]
  }
  validate(value: any): boolean { // TODO remove?
    return !(typeof value === 'undefined')
  }
  link(value: any): any {
    return value
  }
}
