import EntityManager from "../EntityManager";

export default class BaseField {
  em: EntityManager

  constructor(em: EntityManager) {
    this.em = em
  }
  convert(data: any, key: string): any {
    return data[key]
  }
  validate(value: any): boolean {
    return !(typeof value === 'undefined')
  }
}
