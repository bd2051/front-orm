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
            findByPk: (value) => ({ value })
        };
        if (!Object.keys(repositories).includes('findByPk')) {
            throw new Error('The repository must have a method findByPk');
        }
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
    _methodsHandler(values, methodRepository, methodName) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = getUuidByString(methodName + this._sortJsonStringify(values));
            const cache = this.em.cache;
            if (typeof cache[uuid] === 'undefined') {
                cache[uuid] = yield methodRepository.find(values, this.model);
            }
            const cacheUuid = cache[uuid];
            if (typeof cacheUuid === 'undefined') {
                throw new Error('Invalid methodRepository');
            }
            return this.em._createProxy(cacheUuid, this.em.cache[uuid], () => __awaiter(this, void 0, void 0, function* () {
                cache[uuid] = yield methodRepository.find(values, this.model);
            }));
        });
    }
}
//# sourceMappingURL=Repository.js.map