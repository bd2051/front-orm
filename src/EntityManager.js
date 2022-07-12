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
        this.cache = {};
    }
    setModel(model, repositories) {
        this.storage[model.getName()] = {};
        this.models[model.getName()] = model;
        this.repositories[model.getName()] = new Repository(this, model, repositories);
    }
    _createProxy(proxyTarget, storage, cb) {
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