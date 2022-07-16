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
        this.cache = {};
    }
    setModel(model, repositories) {
        this.storage[model.getName()] = {};
        this.updateList[model.getName()] = {};
        this.createList[model.getName()] = {};
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
                yield model.update(storage, item);
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
    }
    _createProxy(proxyTarget, model, pk, cb) {
        const createListModel = this.updateList[model.getName()];
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
        return new Proxy(proxyTarget, {
            get(target, prop, receiver) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (prop === 'revert') {
                    }
                    if (prop === 'clear') {
                    }
                    if (PROPERTY_EXCEPTIONS.includes(prop)) {
                        return Reflect.get(target, prop, receiver);
                    }
                    const createList = createListModel[pk];
                    const updateList = updateListModel[pk];
                    const storage = storageModel[pk];
                    if (typeof createList !== 'undefined') {
                        return Reflect.get(updateList, prop, receiver);
                    }
                    if (typeof updateList !== 'undefined') {
                        return Reflect.get(updateList, prop, receiver);
                    }
                    if (typeof storage !== 'undefined') {
                        return Reflect.get(storage, prop, receiver);
                    }
                    storageModel[pk] = yield cb();
                    return Reflect.get(storageModel[pk], prop, receiver);
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