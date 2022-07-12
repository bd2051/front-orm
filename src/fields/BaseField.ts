import EntityManager from "../EntityManager";

export default class BaseField {
  em: EntityManager

  constructor(em: EntityManager) {
    this.em = em
  }
  convert(value: any): any {
    return value
  }
}
