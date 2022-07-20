import {BaseModel, EntityManager, NumberField, PrimaryKey, StringField} from "../../src";

export default class Author extends BaseModel {
  id: PrimaryKey
  name: StringField
  age: StringField
  constructor(em: EntityManager) {
    super(em);
    this.id = new PrimaryKey(em)
    this.name = new StringField(em)
    this.age = new NumberField(em)
  }
}
