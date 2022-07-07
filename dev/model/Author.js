import BaseModel from "../../src/model/BaseModel";

export class Author extends BaseModel{
  constructor() {
    super();
    this.id = {
      type: 'primaryKey'
    }
    this.name = {
      type: String
    }
    this.age = {
      type: Number
    }
  }
}
