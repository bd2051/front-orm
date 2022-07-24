import Repository from "./Repository.js";
import BaseModel from "./model/BaseModel";
import BaseType from "./types/BaseType";
import Entity from "./types/Entity";
import getUuidByString from "uuid-by-string";

interface StorageModel {
  [key: number|string]: any
}

interface Models {
  [key: string]: BaseModel
}

interface RepositoryInit {
  findByPk: Entity
  [key: string]: BaseType
}

interface Repositories {
  [key: string]: Repository
}

interface FirstLevelStorage {
  [key: string|number]: any
}

interface Storage {
  [key: string]: FirstLevelStorage
}

interface Cache {
  [key: string]: object
}

interface List {
  [key: string]: any
}

interface WorkingField {
  type: 'storage' | 'updated' | 'pending'
  value: any
}

interface WorkingModel {
  [key: string]: WorkingField
}

interface WorkingModelList {
  [key: string]: WorkingModel
}

interface Hooks {
  create: (values: object) => any
  update: (values: object, oldItem: object) => any
  delete: (pk: number|string, oldItem: object) => any
  refresh: (storageModel: StorageModel, pk: number|string, done: () => void) => any
  cancelRefresh: (storageModel: StorageModel, pk: number|string) => any
}

const PROPERTY_EXCEPTIONS = [
  'then',
  'catch',
  'finally'
]

export default class EntityManager {
  models: Models
  repositories: Repositories
  storage: Storage
  updateList: Storage
  createList: Storage
  deleteList: Storage
  workingModels: WorkingModelList
  cache: Cache
  hooks: Hooks
  pending: any

  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.updateList = {}
    this.createList = {}
    this.deleteList = {}
    this.workingModels = {}
    this.cache = {}
    this.pending = null
    this.hooks = {
      create: () => {
        throw new Error('Set create hook')
      },
      update: () => {
        throw new Error('Set update hook')
      },
      delete: () => {
        throw new Error('Set delete hook')
      },
      refresh: () => {
        throw new Error('Set refresh hook')
      },
      cancelRefresh: () => {
        throw new Error('Set cancelRefresh hook')
      },
    }
  }
  setHooks(hooks: Hooks) {
    this.hooks = hooks
  }
  setModel(model: BaseModel, repositories: RepositoryInit) {
    this.storage[model.getName()] = {}
    this.updateList[model.getName()] = {}
    this.createList [model.getName()] = {}
    this.deleteList [model.getName()] = {}
    this.models[model.getName()] = model
    this.repositories[model.getName()] = new Repository(this, model, repositories)
  }
  getModel(modelName: string): BaseModel {
    const model = this.models[modelName]
    if (typeof model === 'undefined') {
      throw new Error('The model does not exist')
    }
    return model
  }
  getRepository(modelName: string): Repository {
    const repository = this.repositories[modelName]
    if (typeof repository === 'undefined') {
      throw new Error('The model does not exist')
    }
    return repository
  }
  getStorageModel(modelName: string): FirstLevelStorage {
    const storageModel = this.storage[modelName]
    if (typeof storageModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    return storageModel
  }
  getCreateListModel(modelName: string): List {
    const createListModel = this.createList[modelName]
    if (typeof createListModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    return createListModel
  }
  getUpdateListModel(modelName: string): List {
    const updateListModel = this.updateList[modelName]
    if (typeof updateListModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    return updateListModel
  }
  getDeleteListModel(modelName: string): List {
    const deleteListModel = this.deleteList[modelName]
    if (typeof deleteListModel === 'undefined') {
      throw new Error('The model does not exist')
    }
    return deleteListModel
  }
  async flush() {
    await Promise.all(Object.keys(this.updateList).map(async (modelName) => {
      const model = this.getModel(modelName)
      const storageModel = this.getStorageModel(modelName)
      const updateListModel = this.getUpdateListModel(modelName)
      await Promise.all(Object.entries(updateListModel).map(async ([pk, item]) => {
        const storage = storageModel[pk]
        if (typeof storage === 'undefined') {
          throw new Error('Logic error')
        }
        await model.update(item, storage)
        delete updateListModel[pk]
      }))
    }))
    await Promise.all(Object.entries(this.createList).map(async ([modelName, createListModel]) => {
      const model = this.getModel(modelName)
      await Promise.all(Object.entries(createListModel).map(async ([pk, item]) => {
        await model.create(item)
        delete createListModel[pk]
      }))
    }))
    await Promise.all(Object.entries(this.deleteList).map(async ([modelName, deleteListModel]) => {
      const model = this.getModel(modelName)
      await Promise.all(Object.entries(deleteListModel).map(async ([pk, item]) => {
        await model.delete(pk, item)
        delete deleteListModel[pk]
      }))
    }))
  }
  _createProxy(model: BaseModel, pk: string|number, cb: (done: () => void) => void): any {
    const createListModel = this.getCreateListModel(model.getName())
    const updateListModel = this.getUpdateListModel(model.getName())
    const storageModel = this.getStorageModel(model.getName())
    const uuid = getUuidByString(`${model.getName()}_${pk}`)
    if (typeof this.workingModels[uuid] === 'undefined') {
      this.workingModels[uuid] = model.getWorkingModel(pk)
    }
    const proxyTarget = this.workingModels[uuid]
    const done = () => {
      const storageEntity = storageModel[pk]
      if (typeof storageEntity === 'undefined') {
        throw new Error('Logic error')
      }
      Object.entries(proxyTarget!).forEach(([key, value]) => {
        if (value.type === 'storage') {
          proxyTarget![key] = {
            type: 'storage',
            value: storageEntity[key]
          }
        }
      })
    }
    model.refresh(storageModel, pk, done)
    const em = this
    return new Proxy(proxyTarget!, {
      get(target, prop: string, receiver) {
        if (prop === 'cancelUpdate') {
          return () => model.cancelUpdate(pk)
        }
        if (prop === 'cancelCreate') {
          return () => model.cancelCreate(pk)
        }
        if (prop === 'cancelDelete') {
          return () => model.cancelDelete(pk)
        }
        if (prop === 'cancelRefresh') {
          return () => model.cancelRefresh(storageModel, pk)
        }

        const createdEntity = createListModel[pk]
        const updatedEntity = updateListModel[pk]
        const storage = storageModel[pk]
        if (typeof createdEntity !== 'undefined') {
          const convertedCreatedEntity = model.validateFields(createdEntity).convertFields(createdEntity)
          return Reflect.get(convertedCreatedEntity, prop, receiver)
        }
        if (typeof updatedEntity !== 'undefined') {
          const updatedProp = updatedEntity[prop]
          if (typeof updatedProp !== 'undefined') {
            const convertedUpdatedEntity = model.validateFields(updatedEntity).convertFields(updatedEntity)
            return Reflect.get(convertedUpdatedEntity, prop, receiver)
          }
        }
        if (typeof storage !== 'undefined') {
          const convertedStorage = model.validateFields(storage).convertFields(storage)
          return Reflect.get(convertedStorage, prop, receiver)
        }
        cb(done)
        console.log(proxyTarget, target, prop)
        target[prop]!.type = 'pending'
        target[prop]!.value = em.pending
        return em.pending
      },
      set(target: WorkingModel, prop: string, value: any, receiver: any): boolean {
        if (prop in target) {
          const updateList = updateListModel[pk]
          if (typeof updateList === 'undefined') {
            updateListModel[pk] = {
              [prop]: value
            }
          } else {
            updateList[prop] = value
          }
          target[prop]!.type = 'updated'
          target[prop]!.value = value
        } else {
          Reflect.set(target, prop, value, receiver)
        }
        return true
      }
    })
  }
  _createCacheProxy(proxyTarget: object, uuid: string, cb: (done: () => void) => void) {
    const cache = this.cache
    return new Proxy(proxyTarget, {
      get(target, prop: string, receiver) {
        if (PROPERTY_EXCEPTIONS.includes(prop)) {
          if (target instanceof Promise) {
            return Reflect.get(target, prop, receiver);
          }
          return new Promise((resolve => resolve(Reflect.get(cache[uuid]!, prop, receiver))))
        }
        const cacheEntity = cache[uuid]
        if (typeof cacheEntity !== 'undefined') {
          return Reflect.get(cacheEntity, prop, receiver)
        }
        return new Promise((resolve) => {
          cb(() => resolve(Reflect.get(cache[uuid]!, prop, receiver)))
        })
      }
    })
  }
}