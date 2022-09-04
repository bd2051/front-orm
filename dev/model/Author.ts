import {BaseModel, CollectionField, EntityManager, NumberField, PrimaryKey, StringField} from "../../src";

interface IntervalMap {
  [key: number|string]: any
}
const intervalMap: IntervalMap = {}

export default class Author extends BaseModel {
  id: PrimaryKey
  name: StringField
  age: StringField
  stories: CollectionField
  constructor(em: EntityManager) {
    super(em);
    this.id = new PrimaryKey(em)
    this.name = new StringField(em)
    this.age = new NumberField(em)
    this.stories = new CollectionField(em, this,  'Story')
  }
  async update(values: object, oldItem: any) {
    fetch(
        `http://localhost:8000/api/authors`,{
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
  refresh(pk: string|number, done: () => void) {
    intervalMap[pk] = setInterval(() => {
        fetch(
        `http://localhost:8000/api/authors/${pk}`
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
