import PrimaryKey from "../../src/fields/PrimaryKey";
import StringField from "../../src/fields/StringField";
import EntityField from "../../src/fields/EntityField";
import Author from "./Author";
import BaseModel from "../../src/model/BaseModel";
import EntityManager from "../../src/EntityManager";

export default class Story extends BaseModel {
  id: PrimaryKey
  name: StringField
  author: EntityField

  constructor(em: EntityManager) {
    super(em);
    this.id = new PrimaryKey(em)
    this.name = new StringField(em)
    this.author = new EntityField(em, Author.name)
  }
  create(values: object) {
    fetch(
        `http://localhost:8000/api/stories`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(values)
        }
    ).then(response => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
  }
  async update(oldItem: any, values: object) {
    fetch(
        `http://localhost:8000/api/stories`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
              ...oldItem,
              author: await (await oldItem.author).id,
              ...values,
          })
        }
    ).then(response => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
  }
}