import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";

export default class PrimaryKey extends BaseField implements FieldInterface {
  type: 'number' | 'string'

  constructor(em: EntityManager,type: 'number' | 'string' = 'number') {
    super(em);
    this.type = type
  }
  validate(value: string | number | null) {
    return typeof value === this.type
  }
}
