import {
  getBaseModel,
  BaseType,
  BaseField,
  Entity,
  BooleanField,
  Collection,
  EntityField,
  NumberField,
  PrimaryKey,
  StringField,
  CollectionField,
  Empty
} from "./index";
import {applyChange, Diff, DiffEdit, observableDiff, revertChange} from "deep-diff";
import {BaseModel, BaseRepository, Model, ModelData, ModelInit, ModelView, Repository} from "./types";
import getBaseRepository from "./repository/getBaseRepository";

interface Models {
  [key: string]: Model
}

interface RepositoryInit {
  [key: string]: BaseType
}

interface Repositories {
  [key: string]: Repository
}

interface StorageItem {
  [key: string]: any
}

interface CommonClasses {
  [key: string]: typeof getBaseModel | typeof getBaseRepository
}

interface FieldsClass {
  [key: string]: typeof BaseField | typeof EntityField | typeof CollectionField
}

interface TypesClass {
  [key: string]: typeof BaseType
}

interface Classes {
  common: CommonClasses
  fields: FieldsClass
  types: TypesClass
}

interface PutValue {
  [key: string]: string | number | null | Array<ModelView> | ModelView | boolean
}

interface ConvertedPutValue {
  [key: string]: string | number | null | Array<ModelData> | ModelData | boolean
}

interface CacheKey {
  pk?: string | number
}

interface Meta {
  options: any
  method: (v: any, model: Model) => Promise<any>
  repository: Repository
}

interface Commit {
  cacheKey: CacheKey,
  diffs: Array<Diff<any, any>>
}

interface Hooks {
  preFlush: (commits: Array<Commit>) => Array<Commit>
  get: (data: Model, pk: string | number) => Promise<any>
  create: (data: ModelData, value: any, commit: Commit) => Promise<string | number>
  update: (data: ModelData, value: any, commit: Commit) => Promise<string | number>
  delete: (data: ModelData, pk: string | number, commit: Commit) => Promise<string | number>
}

interface HooksInit {
  preFlush?: (commits: Array<Commit>) => Array<Commit>
  get: (data: Model, pk: string | number) => Promise<any>
  create: (data: ModelData, value: any, commit: Commit) => Promise<string | number>
  update: (data: ModelData, value: any, commit: Commit) => Promise<string | number>
  delete: (data: ModelData, pk: string | number, commit: Commit) => Promise<string | number>
}

interface FirstLevelStorage {
  [key: string|number]: CacheKey
}

interface Storage {
  [key: string]: FirstLevelStorage
}

export default class EntityManager {
  models: Models
  repositories: Repositories
  storage: Storage
  commits: Array<Commit>
  storageCache: WeakMap<CacheKey, ModelData>
  collectionCache: WeakMap<Array<any>, Meta>
  _setReactivity: <Type>(value: Type) => Type
  reverseStorageCache: WeakMap<ModelData, WeakRef<CacheKey>>
  hooks: Hooks
  pending: any
  removed: any
  defaultClasses: Classes
  onAddModelData: (model?: Model, pk?: number|string) => void
  onAddCollection: (repository?: Repository, collection?: WeakRef<Array<any>>) => void

  constructor(
    setReactivity: <Type>(value: Type) => Type = value => value
  ) {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.collectionCache = new WeakMap<Array<any>, Meta>()
    this._setReactivity = setReactivity
    this.reverseStorageCache = new WeakMap()
    const em = this
    this.storageCache = new Proxy(new WeakMap<CacheKey, ModelData>(), {
      get(target: WeakMap<CacheKey, ModelData>, prop: string | symbol, receiver: any): any {
        if (prop === 'set') {
          return (key: CacheKey, value: ModelData) => {
            const setResult = target.set.call(target, key, em._setReactivity(value))
            em.reverseStorageCache.set(target.get.call(target, key)!, new WeakRef<CacheKey>(key))
            return setResult
          }
        }
        if (prop === 'get') {
          return target.get.bind(target)
        }
        return Reflect.get(target, prop, receiver)
      }
    })
    this.commits = []
    this.pending = null
    this.removed = undefined
    this.onAddModelData = () => {}
    this.onAddCollection = () => {}
    this.hooks = {
      preFlush: (commits) => {
        return commits
      },
      get: async (value, pk) => {
        if (value && pk) {
          throw new Error('Add get hook')
        }
        return ''
      },
      create: async (value, commit, data) => {
        if (value && commit && data) {
          throw new Error('Add create hook')
        }
        return ''
      },
      update: async (value, commit, data) => {
        if (value && commit && data) {
          throw new Error('Add update hook')
        }
        return ''
      },
      delete: async (value, pk, data) => {
        if (value && pk && data) {
          throw new Error('Add delete hook')
        }
        return ''
      }
    }
    this.defaultClasses = {
      common: {
        getBaseModel,
        getBaseRepository,
      },
      fields: {
        BooleanField,
        NumberField,
        PrimaryKey,
        StringField,
        EntityField,
        CollectionField
      },
      types: {
        Collection,
        Entity
      }
    }
  }
  setHooks(hooks: HooksInit) {
    this.hooks = {
      ...this.hooks,
      ...hooks
    }
  }
  setModel(getModelInit: (em: EntityManager) => ModelInit, repositories: RepositoryInit) {
    const baseModel: BaseModel = getBaseModel(this)
    const modelInit = getModelInit(this)
    const model: Model = Object.create(baseModel, this._convertValueToPropertyDescriptorMap(Object.entries(modelInit)))
    model.$setName(getModelInit.name)
    this.storage[model.$getName()] = {}
    this.models[model.$getName()] = model
    const baseRepository: BaseRepository = getBaseRepository(this, model)
    const repository: Repository = Object.create(
      baseRepository,
      this._convertValueToPropertyDescriptorMap(
        Object.entries(repositories)
          .map(([methodName, baseType]) => [
            methodName,
            (values: any) => baseRepository._methodsHandler(values, baseType)
          ])
      )
    )
    this.repositories[model.$getName()] = repository
  }
  getModel(modelName: string): Model {
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
  _createEmptyModelData(model: Model): ModelData {
    const emptyProperty = Object.entries(model).map(([name]) => [name, new Empty()])
    return Object.create(model, this._convertValueToPropertyDescriptorMap(emptyProperty))
  }
  setStorageValue(model: Model, pk: number | string, value: StorageItem): ModelData {
    const storageModel = this.getStorageModel(model.$getName())
    let storageCacheKey = storageModel[pk]
    if (typeof storageCacheKey === 'undefined') {
      storageModel[pk]  = {
        pk
      }
      storageCacheKey = storageModel[pk]!
      this.onAddModelData(model, pk)
    }
    const linkedValue = Object.entries(value).reduce((acc: StorageItem, [key, subValue]) => {
      if (typeof model[key] !== 'undefined') {
        acc[key] = model[key]!.link(subValue)
      }
      return acc
    }, {})
    const property = this._convertValueToPropertyDescriptorMap(Object.entries(linkedValue))
    let storageCacheValue = this.storageCache.get(storageCacheKey)
    if (typeof storageCacheValue === 'undefined') {
      this.storageCache.set(
        storageCacheKey,
        this._createEmptyModelData(model)
      )
      storageCacheValue = this.storageCache.get(storageCacheKey)
    }
    Object.entries(property).forEach(([prop, propValue]) => {
      storageCacheValue![prop] = propValue.value
    })
    return this.storageCache.get(storageCacheKey)!
  }
  _convertValueToPropertyDescriptorMap(entries: Array<Array<any>>) {
    return entries.reduce((acc: PropertyDescriptorMap, [key, value]) => {
      acc[key] = {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value
      }
      return acc
    }, {})
  }
  _convertValue(value: PutValue) {
      return Object.entries(value).reduce((acc: ConvertedPutValue, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = value
          return acc
        }
        if (typeof value === 'number') {
          acc[key] = value
          return acc
        }
        if (typeof value === 'boolean') {
          acc[key] = value
          return acc
        }
        if (value === null) {
          acc[key] = value
          return acc
        }
        if (Array.isArray(value)) {
          acc[key] = value.map((item) => item._target)
          return acc
        }
        if (typeof value._target !== 'undefined') {
          acc[key] = value._target
          return acc
        }
        return acc
      }, {})
  }
  put(value: PutValue, target: ModelView | Model): ModelView {
    let cacheKey: CacheKey | undefined = {}
    let cacheValue = {}
    if (typeof target._target !== 'undefined') {
      const modelView = target as ModelView
      const weakCacheKey = this.reverseStorageCache.get(modelView._target)!
      cacheKey = weakCacheKey.deref()
      if (typeof cacheKey === 'undefined') {
        throw new Error('Unexpected use of WeakRef')
      }
      cacheValue = {...target._target}
    }

    let changedValue = value
    if (Object.keys(changedValue).length) {
      changedValue = {
        ...cacheValue,
        ...this._convertValue(value)
      }
    }

    const diffs = observableDiff(cacheValue, changedValue, (change) => {
      if ('lhs' in change && 'rhs' in change) {
        const path = [...change.path!]
        const prop = path.pop()
        const modelData = path?.reduce((acc: any, curr: string) => {
          return acc[curr]
        }, cacheValue) || {}
        const diff = change as DiffEdit<any>
        if (
          typeof modelData.$getPkName !== 'undefined'
          && prop === modelData.$getPkName()
          && diff.lhs != diff.rhs
        ) {
          Object.defineProperty(change, 'path', {
            value: path,
            enumerable: true,
            configurable: true
          })
          Object.defineProperty(change, 'lhs', {
            value: modelData,
            enumerable: true,
            configurable: true,
          })
          Object.defineProperty(change, 'rhs', {
            value: path?.reduce((acc: any, curr: string) => {
              return acc[curr]
            }, changedValue) || {},
            enumerable: true,
            configurable: true,
          })
        }
      }
    })

    if (typeof diffs === 'undefined') {
      return target as ModelView
    }

    this.commits.push({
      cacheKey,
      diffs
    })

    let changingTarget = this.storageCache.get(cacheKey)
    if (typeof changingTarget === 'undefined') {
      this.storageCache.set(cacheKey, this._createEmptyModelData(target as Model))
      changingTarget = this.storageCache.get(cacheKey)
    }
    diffs.forEach((change: Diff<any, any>) => {
      applyChange(changingTarget, true, change);
    });
    this.storageCache.set(cacheKey, changingTarget!)

    return this._createProxyByCacheKey(cacheKey)
  }
  post(value: PutValue, model: Model) {
    return this.put(value, model)
  }
  remove(modelView: ModelView) {
    return this.put({}, modelView)
  }
  async flush() {
    const commits = this.hooks.preFlush(this.commits)
    // flush hooks common
    const map = commits.reduce((acc: Map<CacheKey, Commit>, commit) => {
      const cacheValue = acc.get(commit.cacheKey)
      if (typeof cacheValue === 'undefined') {
        acc.set(commit.cacheKey, commit)
      } else {
        commit.diffs.forEach((change) => {
          cacheValue.diffs.push(change)
        })
      }
      return acc
    }, new Map())
    //
    // const calculatePriority = (item: any, model: Model) : number => {
    //   let priority = 0
    //   if (typeof item[model.$getPkName()] === 'undefined') {
    //     priority++
    //     const values = Object.values(item) as (Array<Array<ModelData>| ModelData | null>)
    //     values.forEach((value: Array<ModelData> | ModelData | null) => {
    //       if (value === null) {
    //         return
    //       }
    //       if (Array.isArray(value)) {
    //         if (value.every((item: ModelData) => typeof item[item.$getPkName()] !== 'undefined')) {
    //           priority++
    //         }
    //       } else if (typeof value.$getPkName !== 'undefined') {
    //         if (typeof value[value.$getPkName()] !== 'undefined') {
    //           priority++
    //         }
    //       }
    //     })
    //   }
    //   return priority
    // }

    for (const [cacheKey, commit] of Array.from(map)) {
      const item = {}
      commit.diffs.forEach(function (change: Diff<any, any>) {
        applyChange(item, true, change);
      });
      // const priority = calculatePriority(item, Object.getPrototypeOf(this.storageCache.get(cacheKey)!))

      const cacheValue = this.storageCache.get(cacheKey)!
      let promise
      if (typeof cacheKey.pk === 'undefined') {
        promise = cacheValue.$create(item, commit)
      } else if (Object.keys(cacheValue).length === 0) {
        promise = cacheValue.$delete(cacheKey.pk, commit)
      } else {
        promise = cacheValue.$update(item, commit)
      }
      await promise.then((pk) => {
        if (Object.keys(cacheValue).length === 0) {
          delete cacheKey.pk
          delete this.getStorageModel(cacheValue.$getName())[pk]
        } else {
          cacheKey.pk = pk
          cacheValue[cacheValue.$getPkName()] = pk
          this.getStorageModel(cacheValue.$getName())[pk] = cacheKey
        }
      })
    }

    this.commits = []
  }
  revert(count: number = 1) {
    const revertCommits = this.commits.splice(-count).reverse()
    revertCommits.forEach(({cacheKey, diffs}) => {
      const cacheValue = this.storageCache.get(cacheKey)!
      diffs.forEach((change) => {
        revertChange(cacheValue, true, change)
      })
    })
  }
  revertAll() {
    this.revert(this.commits.length)
  }
  _updateDataByCommits(model: Model, pk: number | string, data: any) {
    const item = data
    const cacheKey = this.getStorageModel(model.$getName())[pk]
    if (typeof cacheKey === 'undefined') {
      return item
    }
    const commits = this.commits.filter((commit: Commit) => {
      return commit.cacheKey.pk === pk
    })
    if (commits.length === 0) {
      return item
    }
    commits.forEach(({diffs}) => {
      diffs.forEach((change) => {
        applyChange(item, true, change)
      })
    })
    return item
  }
  _createProxyByCacheKey(
    cacheKey: CacheKey,
    cb = (done: () => void) => {done()},
    done = () => {}
  ): ModelView {
    const em = this
    const modelData = this.storageCache.get(cacheKey) as unknown as ModelView
    return new Proxy(modelData, {
      get(target, prop: string, receiver) {
        if (prop === '_target') {
          return target
        }
        if (prop in target) {
          const storageCacheValue = em.storageCache.get(cacheKey)
          if (typeof storageCacheValue === 'undefined') {
            throw new Error('Logic error')
          }
          if (!(storageCacheValue[prop] instanceof Empty)) {
            if (storageCacheValue[prop] instanceof BaseField) {
              return em.removed
            }
            const model = Object.getPrototypeOf(target) as Model
            return model[prop]!.view(storageCacheValue[prop])
          }
          cb(done)
          return em.pending
        } else {
          return Reflect.get(target, prop, receiver)
        }
      },
      set(target, prop: string, value: any, receiver: any): boolean {
        if (prop in target) {
          throw new Error('Use update method')
        } else {
          Reflect.set(target, prop, value, receiver)
        }
        return true
      }
    })
  }
  _createProxy(model: Model, pk: string|number, cb: (done: () => void) => void): ModelView {
    const storageModel = this.getStorageModel(model.$getName())
    const done = () => {
    }
    let proxyTarget = storageModel[pk];
    if (typeof proxyTarget === 'undefined') {
      this.setStorageValue(model, pk, {})
    }
    return this._createProxyByCacheKey(
      storageModel[pk]!,
      cb,
      done
    )
  }
}