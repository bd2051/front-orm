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
    this.stories = new CollectionField(em, 'Story')
  }
  refresh(storageModel: any, pk: string|number, done: () => void) {
    intervalMap[pk] = setInterval(() => {
        fetch(
        `http://localhost:8000/api/authors/${pk}`
      ).then(response => response.json())
      .then((data) => {
        storageModel[pk] = data
        done()
      })
    }, 1000)
  }
  async cancelRefresh(storageModel: any, pk: string|number) {
    console.log(storageModel)
    clearInterval(intervalMap[pk])
  }
}
