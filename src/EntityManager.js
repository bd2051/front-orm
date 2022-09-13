var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Repository, getBaseModel, BaseField, Entity, BooleanField, Collection, EntityField, NumberField, PrimaryKey, StringField, CollectionField } from "./index";
import { applyChange, diff, revertChange } from "deep-diff";
export default class EntityManager {
    constructor() {
        this.models = {};
        this.repositories = {};
        this.storage = {};
        this.reverseStorageCache = new WeakMap();
        const reverseStorageCache = this.reverseStorageCache;
        this.storageCache = new Proxy(new WeakMap(), {
            get(target, prop, receiver) {
                if (prop === 'set') {
                    return (key, value) => {
                        reverseStorageCache.set(value, new WeakRef(key));
                        return target.set.call(target, key, value);
                    };
                }
                if (prop === 'get') {
                    return target.get.bind(target);
                }
                return Reflect.get(target, prop, receiver);
            }
        });
        this.cache = {};
        this.commits = [];
        this.pending = null;
        this.hooks = {
            preFlush: (commits) => {
                return commits;
            },
            create: (value, commit, data) => __awaiter(this, void 0, void 0, function* () {
                if (value && commit && data) {
                    throw new Error('Add create hook');
                }
                return '';
            }),
            update: (value, commit, data) => __awaiter(this, void 0, void 0, function* () {
                if (value && commit && data) {
                    throw new Error('Add create hook');
                }
                return '';
            })
        };
        this.defaultClasses = {
            common: {
                getBaseModel,
                Repository,
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
        };
    }
    setHooks(hooks) {
        this.hooks = Object.assign(Object.assign({}, this.hooks), hooks);
    }
    setModel(getModelInit, repositories) {
        const baseModel = getBaseModel(this);
        const modelInit = getModelInit(this);
        const model = Object.create(baseModel, this._convertValueToPropertyDescriptorMap(Object.entries(modelInit)));
        model.$setName(getModelInit.name);
        this.storage[model.$getName()] = {};
        this.models[model.$getName()] = model;
        this.repositories[model.$getName()] = new Repository(this, model, repositories);
    }
    getModel(modelName) {
        const model = this.models[modelName];
        if (typeof model === 'undefined') {
            throw new Error('The model does not exist');
        }
        return model;
    }
    getRepository(modelName) {
        const repository = this.repositories[modelName];
        if (typeof repository === 'undefined') {
            throw new Error('The model does not exist');
        }
        return repository;
    }
    getStorageModel(modelName) {
        const storageModel = this.storage[modelName];
        if (typeof storageModel === 'undefined') {
            throw new Error('The model does not exist');
        }
        return storageModel;
    }
    setStorageValue(model, pk, value) {
        const storageModel = this.getStorageModel(model.$getName());
        let storageCacheKey = storageModel[pk];
        if (typeof storageCacheKey === 'undefined') {
            storageModel[pk] = {
                pk
            };
            storageCacheKey = storageModel[pk];
        }
        const linkedValue = Object.entries(value).reduce((acc, [key, subValue]) => {
            if (typeof model[key] !== 'undefined') {
                acc[key] = model[key].link(subValue);
            }
            return acc;
        }, {});
        const property = this._convertValueToPropertyDescriptorMap(Object.entries(linkedValue));
        this.storageCache.set(storageCacheKey, Object.create(model, property));
        return this.storageCache.get(storageCacheKey);
    }
    _convertValueToPropertyDescriptorMap(entries) {
        return entries.reduce((acc, [key, value]) => {
            acc[key] = {
                enumerable: true,
                configurable: false,
                writable: true,
                value: value
            };
            return acc;
        }, {});
    }
    put(value, target) {
        let cacheKey = {};
        let cacheValue = {};
        if (typeof target._target !== 'undefined') {
            const modelView = target;
            const weakCacheKey = this.reverseStorageCache.get(modelView._target);
            cacheKey = weakCacheKey.deref();
            if (typeof cacheKey === 'undefined') {
                throw new Error('Unexpected use of WeakRef');
            }
            cacheValue = Object.assign({}, target._target);
        }
        const convertValue = (value) => {
            return Object.entries(value).reduce((acc, [key, value]) => {
                if (typeof value === 'string') {
                    acc[key] = value;
                    return acc;
                }
                if (typeof value === 'number') {
                    acc[key] = value;
                    return acc;
                }
                if (typeof value === 'boolean') {
                    acc[key] = value;
                    return acc;
                }
                if (value === null) {
                    acc[key] = value;
                    return acc;
                }
                if (Array.isArray(value)) {
                    acc[key] = value.map((item) => item._target);
                    return acc;
                }
                if (typeof value._target !== 'undefined') {
                    acc[key] = value._target;
                    return acc;
                }
                return acc;
            }, {});
        };
        const diffs = diff(cacheValue, Object.assign(Object.assign({}, cacheValue), convertValue(value)));
        if (typeof diffs === 'undefined') {
            return target;
        }
        this.commits.push({
            cacheKey,
            diffs
        });
        let changingTarget = this.storageCache.get(cacheKey);
        if (typeof changingTarget === 'undefined') {
            this.storageCache.set(cacheKey, Object.create(target));
            changingTarget = this.storageCache.get(cacheKey);
        }
        diffs.forEach(function (change) {
            applyChange(changingTarget, true, change);
        });
        this.storageCache.set(cacheKey, changingTarget);
        return this._createProxyByCacheKey(cacheKey);
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            const commits = this.hooks.preFlush(this.commits);
            // flush hooks common
            const map = commits.reduce((acc, commit) => {
                const cacheValue = acc.get(commit.cacheKey);
                if (typeof cacheValue === 'undefined') {
                    acc.set(commit.cacheKey, commit);
                }
                else {
                    commit.diffs.forEach((change) => {
                        cacheValue.diffs.push(change);
                    });
                }
                return acc;
            }, new Map());
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
                const item = {};
                commit.diffs.forEach(function (change) {
                    applyChange(item, true, change);
                });
                // const priority = calculatePriority(item, Object.getPrototypeOf(this.storageCache.get(cacheKey)!))
                const cacheValue = this.storageCache.get(cacheKey);
                let promise;
                if (typeof cacheKey.pk === 'undefined') {
                    promise = cacheValue.$create(item, commit);
                }
                else {
                    promise = cacheValue.$update(item, commit);
                }
                yield promise.then((pk) => {
                    cacheKey.pk = pk;
                    cacheValue[cacheValue.$getPkName()] = pk;
                    this.getStorageModel(cacheValue.$getName())[pk] = cacheKey;
                });
            }
            this.commits = [];
        });
    }
    revert(count = 1) {
        const revertCommits = this.commits.splice(-1, count);
        revertCommits.forEach(({ cacheKey, diffs }) => {
            const cacheValue = this.storageCache.get(cacheKey);
            diffs.forEach((change) => {
                revertChange(cacheValue, true, change);
            });
        });
    }
    revertAll() {
        this.revert(this.commits.length);
    }
    _createProxyByCacheKey(cacheKey, cb = (done) => { done(); }, done = () => { }) {
        const em = this;
        const modelData = this.storageCache.get(cacheKey);
        return new Proxy(modelData, {
            get(target, prop, receiver) {
                if (prop === '_target') {
                    return target;
                }
                if (prop in target) {
                    const storageCacheValue = em.storageCache.get(cacheKey);
                    if (typeof storageCacheValue === 'undefined') {
                        throw new Error('Logic error');
                    }
                    if (!(storageCacheValue[prop] instanceof BaseField)) {
                        const model = Object.getPrototypeOf(target);
                        return model[prop].view(storageCacheValue[prop]);
                    }
                    cb(done);
                    return em.pending;
                }
                else {
                    return Reflect.get(target, prop, receiver);
                }
            },
            set(target, prop, value, receiver) {
                if (prop in target) {
                    throw new Error('Use update method');
                }
                else {
                    Reflect.set(target, prop, value, receiver);
                }
                return true;
            }
        });
    }
    _createProxy(model, pk, cb) {
        const storageModel = this.getStorageModel(model.$getName());
        const done = () => {
        };
        let proxyTarget = storageModel[pk];
        if (typeof proxyTarget === 'undefined') {
            this.setStorageValue(model, pk, {});
        }
        return this._createProxyByCacheKey(storageModel[pk], cb, done);
    }
}
