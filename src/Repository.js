var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getUuidByString from "uuid-by-string";
export default class Repository {
    constructor(em, model, repositories) {
        this.model = model;
        this.em = em;
        this.methodsCb = {
            findByPk: (value) => value
        };
        Object.entries(repositories).forEach(([methodName, repository]) => {
            repository.setEntityManager(em);
            this[methodName] = (values) => this._methodsHandler(values, repository, methodName);
            this.methodsCb[methodName] = repository.findCb;
        });
    }
    _sortJsonStringify(obj) {
        const allKeys = new Set();
        JSON.stringify(obj, (key) => allKeys.add(key));
        return JSON.stringify(obj, Array.from(allKeys).sort());
    }
    create(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = getUuidByString(Date.now().toString());
            const model = this.model;
            const createListModel = this.em.getCreateListModel(model.getName());
            createListModel[uuid] = values;
            return this.em._createProxy(model, model, uuid, () => __awaiter(this, void 0, void 0, function* () { }));
        });
    }
    delete(pk) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model;
            const deleteListModel = this.em.getDeleteListModel(model.getName());
            const storageModel = this.em.getStorageModel(model.getName());
            let item = storageModel[pk];
            if (typeof item === 'undefined') {
                item = yield model.getRepository().methodsCb.findByPk(pk);
                storageModel[pk] = item;
            }
            deleteListModel[pk] = item;
            return this.em._createProxy(model, model, pk, () => __awaiter(this, void 0, void 0, function* () {
                const result = yield model.getRepository().methodsCb.findByPk(pk);
                storageModel[pk] = result;
                return result;
            }));
        });
    }
    _methodsHandler(values, methodRepository, methodName) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = getUuidByString(methodName + this._sortJsonStringify(values));
            const cache = this.em.cache;
            if (typeof cache[uuid] === 'undefined') {
                cache[uuid] = yield methodRepository.find(values, this.model);
            }
            return this.em._createCacheProxy(cache[uuid], uuid, () => __awaiter(this, void 0, void 0, function* () {
                cache[uuid] = yield methodRepository.find(values, this.model);
                return cache[uuid];
            }));
        });
    }
}
//# sourceMappingURL=Repository.js.map