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
  create(values: object) {
    // добавление нового объекта и его валидация
    // this.em.create(this, values)
    console.log(values)
  }
  cancelCreate(pk: number|string) {
    const createListModel = this.em.createList[this.getName()]
    if (typeof createListModel === 'undefined') {
      throw new Error('Logic error')
    }
    delete createListModel[pk]
  }
  update(values: object, oldItem: object) {
    // бновление объекта и его валидация
    console.log(oldItem, values)
  }
  cancelUpdate(pk: number|string) {
    const updateListModel = this.em.updateList[this.getName()]
    if (typeof updateListModel === 'undefined') {
      throw new Error('Logic error')
    }
    delete updateListModel[pk]
  }
  delete(pk: number|string, oldItem: object) {
    // бновление объекта и его валидация
    console.log(oldItem, pk)
  }
  cancelDelete(pk: number|string) {
    const deleteListModel = this.em.deleteList[this.getName()]
    if (typeof deleteListModel === 'undefined') {
      throw new Error('Logic error')
    }
    delete deleteListModel[pk]
  }
  refresh(storageModel: StorageModel, pk: number|string) {
    // бновление объекта и его валидация
    console.log(storageModel, pk)
  }
  cancelRefresh(storageModel: StorageModel, pk: number|string) {
    // бновление объекта и его валидация
    console.log(storageModel, pk)
  }
}