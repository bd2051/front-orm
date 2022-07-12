import PrimaryKey from "../../src/fields/PrimaryKey";
import StringField from "../../src/fields/StringField";
import BaseModel from "../../src/model/BaseModel";
import EntityManager from "../../src/EntityManager";

export default class Author extends BaseModel {
  id: PrimaryKey
  name: StringField
  age: StringField
  constructor(em: EntityManager) {
    super(em);
    this.id = new PrimaryKey(em)
    this.name = new StringField(em)
    this.age = new StringField(em)
  }
}
