import BaseModel from "../../src/model/BaseModel";
import PrimaryKey from "../../src/fields/PrimaryKey";
import StringField from "../../src/fields/StringField";
import EntityField from "../../src/fields/EntityField";
import Author from "./Author";

export default class Story extends BaseModel{
    constructor() {
      super();
      this.id = new PrimaryKey()
      this.name = new StringField()
      this.author = new EntityField(Author.name)
  }
}