// import PrimaryKey from "../fields/PrimaryKey";
// import BaseField from "../fields/BaseField";
import EntityManager from "../EntityManager";
import BaseField from "../fields/BaseField";
import PrimaryKey from "../fields/PrimaryKey";
import Repository from "../Repository";

interface Fields {
  [key: string]: any
}

export default class BaseModel {
  [key: string]: BaseField | EntityManager | string | null | ((v: any) => any)
  pk: string | null
  em: EntityManager

  constructor(em: EntityManager) {
    this.pk = null
    this.em = em
  }
  getPk(): string {
    if (this.pk === null) {
      const pk = Object.keys(this).find((key) => this[key] instanceof PrimaryKey)
      if (typeof pk !== 'string') {
        throw new Error('Add PrimaryKey')
      }
      this.pk = pk
    }
    return this.pk
  }
  getPkField(): PrimaryKey {
    const pk: keyof this = this.getPk()
    let pkFields: PrimaryKey
    const temp = this[pk]
    if (temp instanceof PrimaryKey) {
      pkFields = temp
    } else {
      throw new Error('Logic error')
    }
    return pkFields
  }
  getName() {
    return this.constructor.name
  }
  getRepository(): Repository {
    const repository = this.em.repositories[this.getName()]
    if (typeof repository === 'undefined') {
      throw new Error('Logic error')
    }
    return repository
  }
  validateFields(data: Fields) {
    console.log(data)
    // if (!Object.keys(data).every(key => this[key].validate(data[key]))) {
    //   throw new Error('invalid fields')
    // } TODO
    return this
  }
  convertFields(data: any) {
    return Object.keys(data).reduce((acc: Fields, key) => {
      const field = this[key]
      if (field instanceof BaseField) {
        acc[key] = field.convert(data[key])
      }
      return acc
    }, {})
  }
}