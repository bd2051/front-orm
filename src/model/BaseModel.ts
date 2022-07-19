import EntityManager from "../EntityManager";
import BaseField from "../fields/BaseField";
import PrimaryKey from "../fields/PrimaryKey";
import Repository from "../Repository";

interface Fields {
  [key: string]: any
}

interface StorageModel {
  [key: number|string]: any
}

export default class BaseModel implements ModelInterface {
  [key: string]: BaseField | EntityManager | string | null | ((v: any, o?: any) => any)
  pkName: string | null
  em: EntityManager

  constructor(em: EntityManager) {
    this.pkName = null
    this.em = em
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
    } else {
      throw new Error('Logic error')
    }
    return pkFields
  }
  getName() {
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
    })) {
      throw new Error('invalid fields')
    }
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
  create(values: object) {
    return this.em.hooks.create(values)
  }
  cancelCreate(pk: number|string) {
    const createListModel = this.em.getCreateListModel(this.getName())
    delete createListModel[pk]
  }
  update(values: object, oldItem: object) {
    return this.em.hooks.update(values, oldItem)
  }
  cancelUpdate(pk: number|string) {
    const updateListModel = this.em.getUpdateListModel(this.getName())
    delete updateListModel[pk]
  }
  delete(pk: number|string, oldItem: object) {
    return this.em.hooks.delete(pk, oldItem)
  }
  cancelDelete(pk: number|string) {
    const deleteListModel = this.em.getDeleteListModel(this.getName())
    delete deleteListModel[pk]
  }
  refresh(storageModel: StorageModel, pk: number|string) {
    return this.em.hooks.refresh(storageModel, pk)
  }
  cancelRefresh(storageModel: StorageModel, pk: number|string) {
    return this.em.hooks.cancelRefresh(storageModel, pk)
  }
}