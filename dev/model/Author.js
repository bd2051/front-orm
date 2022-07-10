import BaseModel from "../../src/model/BaseModel";
import PrimaryKey from "../../src/fields/PrimaryKey";
import StringField from "../../src/fields/StringField";

export default class Author extends BaseModel {
  constructor() {
    super();
    this.id = new PrimaryKey()
    this.name = new StringField()
    this.age = new StringField()
  }
}
