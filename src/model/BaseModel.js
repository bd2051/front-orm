import PrimaryKey from "../fields/PrimaryKey";

export default class BaseModel {
  constructor() {
    this.pk = null
    this.em = null
  }
  getPk() {
    if (this.pk === null) {
      this.pk = Object.keys(this).find((key) => this[key] instanceof PrimaryKey)
      if (!this.pk) {
        throw new Error('Add PrimaryKey')
      }
    }
    return this.pk
  }
  getName() {
    return this.constructor.name
  }
  setEntityManager(em) {
    this.em = em
  }
  getRepository() {
    return this.em.repositories[this.getName()]
  }
  validateFields(data) {
    // if (!Object.keys(data).every(key => this[key].validate(data[key]))) {
    //   throw new Error('invalid fields')
    // } TODO
    return this
  }
  convertFields(data) {
    return Object.keys(data).reduce((acc, key) => {
      if (this[key]) {
        acc[key] = this[key].convert(data[key])
      }
      return acc
    }, {})
  }
}