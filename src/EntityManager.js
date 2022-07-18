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
        this.cache = {};
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
    flush() {
        Object.entries(this.updateList).forEach(([modelName, updateListModel]) => {
            const model = this.models[modelName];
            if (typeof model === 'undefined') {
                throw new Error('Logic error');
            }
            const storageModel = this.storage[modelName];
            if (typeof storageModel === 'undefined') {
                throw new Error('Logic error');
            }
            Object.entries(updateListModel).forEach(([pk, item]) => __awaiter(this, void 0, void 0, function* () {
                const storage = storageModel[pk];
                if (typeof storage === 'undefined') {
                    throw new Error('Logic error');
                }
                yield model.update(item, storage);
                delete updateListModel[pk];
            }));
        });
        Object.entries(this.createList).forEach(([modelName, createListModel]) => {
            const model = this.models[modelName];
            if (typeof model === 'undefined') {
                throw new Error('Logic error');
            }
            Object.entries(createListModel).forEach(([pk, item]) => __awaiter(this, void 0, void 0, function* () {
                yield model.create(item);
                delete createListModel[pk];
            }));
        });
        Object.entries(this.deleteList).forEach(([modelName, deleteListModel]) => {
            const model = this.models[modelName];
            if (typeof model === 'undefined') {
                throw new Error('Logic error');
            }
            Object.entries(deleteListModel).forEach(([pk, item]) => __awaiter(this, void 0, void 0, function* () {
                yield model.delete(pk, item);
                delete deleteListModel[pk];
            }));
        });
    }
    _createProxy(proxyTarget, model, pk, cb) {
        const createListModel = this.createList[model.getName()];
        if (typeof createListModel === 'undefined') {
            throw new Error('The model does not exist');
        }
        const updateListModel = this.updateList[model.getName()];
        if (typeof updateListModel === 'undefined') {
            throw new Error('The model does not exist');
        }
        const storageModel = this.storage[model.getName()];
        if (typeof storageModel === 'undefined') {
            throw new Error('The model does not exist');
        }
        model.refresh(storageModel, pk);
        return new Proxy(proxyTarget, {
            get(target, prop, receiver) {
                return __awaiter(this, void 0, void 0, function* () {
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
                    if (PROPERTY_EXCEPTIONS.includes(prop)) {
                        return Reflect.get(target, prop, receiver);
                    }
                    const createList = createListModel[pk];
                    const updateList = updateListModel[pk];
                    const storage = storageModel[pk];
                    if (typeof createList !== 'undefined') {
                        const convertedCreateList = model.validateFields(createList).convertFields(createList);
                        return Reflect.get(convertedCreateList, prop, receiver);
                    }
                    if (typeof updateList !== 'undefined') {
                        const convertedUpdateList = model.validateFields(updateList).convertFields(updateList);
                        return Reflect.get(convertedUpdateList, prop, receiver);
                    }
                    if (typeof storage !== 'undefined') {
                        const convertedStorage = model.validateFields(storage).convertFields(storage);
                        return Reflect.get(convertedStorage, prop, receiver);
                    }
                    storageModel[pk] = yield cb();
                    const convertedStorage = model.validateFields(storageModel[pk]).convertFields(storageModel[pk]);
                    return Reflect.get(convertedStorage, prop, receiver);
                });
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
                }
                else {
                    Reflect.set(target, prop, value, receiver);
                }
                return true;
            }
        });
    }
    _createCacheProxy(proxyTarget, storage, cb) {
        return new Proxy(proxyTarget, {
            get(target, prop, receiver) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (PROPERTY_EXCEPTIONS.includes(prop)) {
                        return Reflect.get(target, prop, receiver);
                    }
                    if (typeof storage !== 'undefined') {
                        return Reflect.get(storage, prop, receiver);
                    }
                    storage = yield cb();
                    return Reflect.get(storage, prop, receiver);
                });
            }
        });
    }
}
//# sourceMappingURL=EntityManager.js.map