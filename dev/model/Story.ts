import PrimaryKey from "../../src/fields/PrimaryKey";
import StringField from "../../src/fields/StringField";
import EntityField from "../../src/fields/EntityField";
import Author from "./Author";
import BaseModel from "../../src/model/BaseModel";
import EntityManager from "../../src/EntityManager";

export default class Story extends BaseModel{
  id: PrimaryKey
  name: StringField
  author: EntityField

  constructor(em: EntityManager) {
    super(em);
    this.id = new PrimaryKey(em)
    this.name = new StringField(em)
    this.author = new EntityField(em, Author.name)
  }
}