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
export default class EntityManager {
    constructor() {
        this.models = {};
        this.repositories = {};
        this.storage = {};
        this.cache = {};
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
        const property = Object.entries(value).reduce((acc, [key, subValue]) => {
            acc[key] = {
                enumerable: true,
                configurable: true,
                writable: true,
                value: subValue
            };
            return acc;
        }, {});
        storageModel[pk] = Object.create(model, property);
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    _createProxy(model, pk, cb, hasRefresh = true) {
        const storageModel = this.getStorageModel(model.getName());
        const done = () => {
        };
        if (hasRefresh) {
            model.refresh(storageModel, pk, done);
        }
        const em = this;
        let proxyTarget = storageModel[pk];
        if (typeof proxyTarget === 'undefined') {
            em.setStorageValue(model, pk, {});
        }
        return new Proxy(storageModel[pk], {
            get(target, prop, receiver) {
                if (prop === 'cancelRefresh') {
                    return () => model.cancelRefresh(storageModel, pk);
                }
                if (prop in target) {
                    const storage = storageModel[pk];
                    if (typeof storage !== 'undefined' && !BaseField.prototype.isPrototypeOf(storage[prop])) {
                        const convertedStorage = model.validateFields(storage).convertFields(storage);
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
