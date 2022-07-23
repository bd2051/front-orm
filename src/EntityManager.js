var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Repository from "./Repository.js";
import getUuidByString from "uuid-by-string";
const PROPERTY_EXCEPTIONS = [
    'then',
    'catch',
    'finally'
];
export default class EntityManager {
    constructor() {
        this.models = {};
        this.repositories = {};
        this.storage = {};
        this.updateList = {};
        this.createList = {};
        this.deleteList = {};
        this.workingModels = {};
        this.cache = {};
        this.pending = null;
        this.hooks = {
            create: () => {
                throw new Error('Set create hook');
            },
            update: () => {
                throw new Error('Set update hook');
            },
            delete: () => {
                throw new Error('Set delete hook');
            },
            refresh: () => {
                throw new Error('Set refresh hook');
            },
            cancelRefresh: () => {
                throw new Error('Set cancelRefresh hook');
            },
        };
    }
    setHooks(hooks) {
        this.hooks = hooks;
    }
    setModel(model, repositories) {
        this.storage[model.getName()] = {};
        this.updateList[model.getName()] = {};
        this.createList[model.getName()] = {};
        this.deleteList[model.getName()] = {};
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
    getCreateListModel(modelName) {
        const createListModel = this.createList[modelName];
        if (typeof createListModel === 'undefined') {
            throw new Error('The model does not exist');
        }
        return createListModel;
    }
    getUpdateListModel(modelName) {
        const updateListModel = this.updateList[modelName];
        if (typeof updateListModel === 'undefined') {
            throw new Error('The model does not exist');
        }
        return updateListModel;
    }
    getDeleteListModel(modelName) {
        const deleteListModel = this.deleteList[modelName];
        if (typeof deleteListModel === 'undefined') {
            throw new Error('The model does not exist');
        }
        return deleteListModel;
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(Object.keys(this.updateList).map((modelName) => __awaiter(this, void 0, void 0, function* () {
                const model = this.getModel(modelName);
                const storageModel = this.getStorageModel(modelName);
                const updateListModel = this.getUpdateListModel(modelName);
                yield Promise.all(Object.entries(updateListModel).map(([pk, item]) => __awaiter(this, void 0, void 0, function* () {
                    const storage = storageModel[pk];
                    if (typeof storage === 'undefined') {
                        throw new Error('Logic error');
                    }
                    yield model.update(item, storage);
                    delete updateListModel[pk];
                })));
            })));
            yield Promise.all(Object.entries(this.createList).map(([modelName, createListModel]) => __awaiter(this, void 0, void 0, function* () {
                const model = this.getModel(modelName);
                yield Promise.all(Object.entries(createListModel).map(([pk, item]) => __awaiter(this, void 0, void 0, function* () {
                    yield model.create(item);
                    delete createListModel[pk];
                })));
            })));
            yield Promise.all(Object.entries(this.deleteList).map(([modelName, deleteListModel]) => __awaiter(this, void 0, void 0, function* () {
                const model = this.getModel(modelName);
                yield Promise.all(Object.entries(deleteListModel).map(([pk, item]) => __awaiter(this, void 0, void 0, function* () {
                    yield model.delete(pk, item);
                    delete deleteListModel[pk];
                })));
            })));
        });
    }
    _createProxy(model, pk, cb) {
        const createListModel = this.getCreateListModel(model.getName());
        const updateListModel = this.getUpdateListModel(model.getName());
        const storageModel = this.getStorageModel(model.getName());
        const uuid = getUuidByString(`${model.getName()}_${pk}`);
        if (typeof this.workingModels[uuid] === 'undefined') {
            this.workingModels[uuid] = model.getWorkingModel(pk);
        }
        const proxyTarget = this.workingModels[uuid];
        const done = () => {
            const storageEntity = storageModel[pk];
            if (typeof storageEntity === 'undefined') {
                throw new Error('Logic error');
            }
            Object.entries(proxyTarget).forEach(([key, value]) => {
                if (value.type === 'storage') {
                    proxyTarget[key] = {
                        type: 'storage',
                        value: storageEntity[key]
                    };
                }
            });
        };
        model.refresh(storageModel, pk, done);
        const em = this;
        return new Proxy(proxyTarget, {
            get(target, prop, receiver) {
                if (prop === 'cancelUpdate') {
                    return () => model.cancelUpdate(pk);
                }
                if (prop === 'cancelCreate') {
                    return () => model.cancelCreate(pk);
                }
                if (prop === 'cancelDelete') {
                    return () => model.cancelDelete(pk);
                }
                if (prop === 'cancelRefresh') {
                    return () => model.cancelRefresh(storageModel, pk);
                }
                const createdEntity = createListModel[pk];
                const updatedEntity = updateListModel[pk];
                const storage = storageModel[pk];
                if (typeof createdEntity !== 'undefined') {
                    const convertedCreatedEntity = model.validateFields(createdEntity).convertFields(createdEntity);
                    return Reflect.get(convertedCreatedEntity, prop, receiver);
                }
                if (typeof updatedEntity !== 'undefined') {
                    const updatedProp = updatedEntity[prop];
                    if (typeof updatedProp !== 'undefined') {
                        const convertedUpdatedEntity = model.validateFields(updatedEntity).convertFields(updatedEntity);
                        return Reflect.get(convertedUpdatedEntity, prop, receiver);
                    }
                }
                if (typeof storage !== 'undefined') {
                    const convertedStorage = model.validateFields(storage).convertFields(storage);
                    return Reflect.get(convertedStorage, prop, receiver);
                }
                cb(done);
                console.log(storageModel);
                target[prop] = {
                    type: 'pending',
                    value: em.pending
                };
                return em.pending;
            },
            set(target, prop, value, receiver) {
                if (prop in target) {
                    const updateList = updateListModel[pk];
                    if (typeof updateList === 'undefined') {
                        updateListModel[pk] = {
                            [prop]: value
                        };
                    }
                    else {
                        updateList[prop] = value;
                    }
                    target[prop].type = 'updated';
                }
                else {
                    Reflect.set(target, prop, value, receiver);
                }
                return true;
            }
        });
    }
    _createCacheProxy(proxyTarget, uuid, cb) {
        const cache = this.cache;
        return new Proxy(proxyTarget, {
            get(target, prop, receiver) {
                if (PROPERTY_EXCEPTIONS.includes(prop)) {
                    if (target instanceof Promise) {
                        return Reflect.get(target, prop, receiver);
                    }
                    return new Promise((resolve => resolve(Reflect.get(cache[uuid], prop, receiver))));
                }
                const cacheEntity = cache[uuid];
                if (typeof cacheEntity !== 'undefined') {
                    return Reflect.get(cacheEntity, prop, receiver);
                }
                return new Promise((resolve) => {
                    cb(() => resolve(Reflect.get(cache[uuid], prop, receiver)));
                });
            }
        });
    }
}
