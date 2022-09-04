import {BaseModel, EntityField, EntityManager, PrimaryKey, StringField} from "../../src"
import Author from "./Author";

interface IntervalMap {
  [key: number|string]: any
}
const intervalMap: IntervalMap = {}

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
  async update(values: object, oldItem: any) {
    fetch(
        `http://localhost:8000/api/stories`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
              ...oldItem,
              ...values,
          })
        }
    ).then(response => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
  }
  async delete(pk: string|number) {
    fetch(
        `http://localhost:8000/api/stories/${pk}`,{
          method: 'DELETE',
        }
    ).then(response => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
  }
  refresh(pk: string|number, done: () => void) {
    intervalMap[pk] = setInterval(() => {
        fetch(
        `http://localhost:8000/api/stories/${pk}`
      ).then(response => response.json())
      .then((data) => {
        this.em.setStorageValue(this, pk, data)
        done()
      })
    }, 1000)
  }
  async cancelRefresh(pk: string|number) {
    clearInterval(intervalMap[pk])
  }
}