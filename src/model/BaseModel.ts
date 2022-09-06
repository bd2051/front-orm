import EntityManager from "../EntityManager";
import BaseField from "../fields/BaseField";
import PrimaryKey from "../fields/PrimaryKey";
import Repository from "../Repository";

interface Fields {
  [key: string]: any
}

export default class BaseModel {
  [key: string]: BaseField | EntityManager | Fields | string | null | ((v: any, o1?: any, o2?: any) => any)
  pkName: string | null
  em: EntityManager
  _fields: Fields | null

  constructor(em: EntityManager) {
    this.pkName = null
    this.em = em
    this._fields = null
  }
  getPkName(): string {
    if (this.pkName === null) {
      const pkName = Object.keys(this).find((key) => this[key] instanceof PrimaryKey)
      if (typeof pkName !== 'string') {
        throw new Error('Add PrimaryKey')
      }
      this.pkName = pkName
    }
    return this.pkName
  }
  getPkField(): PrimaryKey {
    const pkName: keyof this = this.getPkName()
    let pkFields: PrimaryKey
    const temp = this[pkName]
    if (temp instanceof PrimaryKey) {
      pkFields = temp
    }
    return pkFields!
  }
  getName() {
    if (this.constructor.name === 'Object') {
      return Object.getPrototypeOf(this).getName()
    }
    return this.constructor.name
  }
  getRepository(): Repository {
    return this.em.getRepository(this.getName())
  }
  validateFields(data: Fields) {
    if (!Object.entries(data).every(([key, item]) => {
      const field = this[key]
      if (field instanceof BaseField) {
        return field.validate(item)
      }
      return true
    })) {
      console.log(data)
      throw new Error('invalid fields')
    }
    return this
  }
  convertFields(data: any) {
    return Object.keys(data).reduce((acc: Fields, key) => {
      const field = this[key]
      if (field instanceof BaseField) {
        acc[key] = field.convert(data, key)
      }
      return acc
    }, {})
  }
  get fields(): Fields {
    if (this._fields === null) {
      this._fields = Object.entries(this)
        .filter(([, value]) => value instanceof BaseField)
        .reduce((acc: Fields, [key]) => {
          acc[key] = true
          return acc
        }, {})
    }
    return this._fields
  }
}