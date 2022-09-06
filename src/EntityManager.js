var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Repository, BaseModel, BaseField, Entity, BooleanField, Collection, EntityField, NumberField, PrimaryKey, StringField, CollectionField } from "./index";
import { applyChange, diff } from "deep-diff";
export default class EntityManager {
    constructor() {
        this.models = {};
        this.repositories = {};
        this.storage = {};
        this.storageCache = new WeakMap();
        this.cache = {};
        this.commits = [];
        this.pending = null;
        this.hooks = {
            refresh: () => {
                throw new Error('Set refresh hook');
            },
            cancelRefresh: () => {
                throw new Error('Set cancelRefresh hook');
            },
        };
        this.defaultClasses = {
            common: {
                BaseModel,
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
        this.hooks = hooks;
    }
    setModel(model, repositories) {
        this.storage[model.getName()] = {};
        this.models[model.getName()] = model;
        this.repositories[model.getName()] = new Repository(this, model, repositories);
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
        const storageModel = this.getStorageModel(model.getName());
        let storageCacheKey = storageModel[pk];
        if (typeof storageCacheKey === 'undefined') {
            storageModel[pk] = {
                pk
            };
            storageCacheKey = storageModel[pk];
        }
        const property = Object.entries(value).reduce((acc, [key, subValue]) => {
            acc[key] = {
                enumerable: true,
                configurable: true,
                writable: true,
                value: subValue
            };
            return acc;
        }, {});
        this.storageCache.set(storageCacheKey, Object.create(model, property));
    }
    put(value, target) {
        let cacheKey = {};
        let cacheValue = {};
        let model = target;
        const pk = target[target.getPkName()];
        if (!(pk instanceof BaseField)) {
            if (!(typeof pk === 'number' || typeof pk === 'string')) {
                throw new Error('Logic error');
            }
            const storageModel = this.getStorageModel(target.getName());
            cacheKey = storageModel[pk];
            if (typeof cacheKey === 'undefined') {
                cacheKey = {
                    pk
                };
            }
            cacheValue = Object.assign({}, target);
            model = Object.getPrototypeOf(target);
        }
        const diffs = diff(cacheValue, Object.assign(Object.assign({}, cacheValue), value));
        if (typeof diffs === 'undefined') {
            return;
        }
        this.commits.push({
            cacheKey,
            diffs
        });
        let changingTarget = target;
        if (changingTarget instanceof BaseModel) {
            this.storageCache.set(cacheKey, {});
            changingTarget = this.storageCache.get(cacheKey);
        }
        diffs.forEach(function (change) {
            applyChange(changingTarget, true, change);
        });
        if (!(model instanceof BaseModel)) {
            throw new Error('Logic error');
        }
        console.log(changingTarget, cacheKey, this.storageCache.get(cacheKey));
        return this._createProxyByCacheKey(cacheKey, model);
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.commits);
        });
    }
    _createProxyByCacheKey(cacheKey, model, cancelRefresh = () => { }, cb = (done) => { done(); }, done = () => { }) {
        const em = this;
        return new Proxy(this.storageCache.get(cacheKey), {
            get(target, prop, receiver) {
                if (prop === 'cancelRefresh') {
                    return cancelRefresh;
                }
                if (prop in target) {
                    const storageCacheKey = cacheKey;
                    const storageCacheValue = em.storageCache.get(storageCacheKey);
                    console.log(storageCacheKey, storageCacheValue);
                    if (typeof storageCacheKey !== 'undefined' && !BaseField.prototype.isPrototypeOf(storageCacheValue[prop])) {
                        const convertedStorage = model.validateFields(storageCacheValue).convertFields(storageCacheValue);
                        return Reflect.get(convertedStorage, prop, receiver);
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
    _createProxy(model, pk, cb, hasRefresh = true) {
        const storageModel = this.getStorageModel(model.getName());
        const done = () => {
        };
        if (hasRefresh) {
            model.refresh(pk, done);
        }
        let proxyTarget = storageModel[pk];
        if (typeof proxyTarget === 'undefined') {
            this.setStorageValue(model, pk, {});
        }
        return this._createProxyByCacheKey(storageModel[pk], model, () => model.cancelRefresh(pk), cb, done);
    }
    _createArrayProxy(arrayTarget, targetModel, convertValueToPk) {
        const em = this;
        return new Proxy(arrayTarget.map((value) => {
            const pk = convertValueToPk(value);
            const findByPk = targetModel.getRepository().methodsCb.findByPk;
            return this._createProxy(targetModel, pk, (done) => __awaiter(this, void 0, void 0, function* () {
                const result = yield findByPk(pk);
                em.setStorageValue(targetModel, pk, result);
                done();
            }));
        }), {
            get(target, prop, receiver) {
                if (['push', 'pop', 'shift', 'unshift'].includes(prop)) {
                    throw new Error('Use update method');
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }
}
