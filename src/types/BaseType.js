var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class BaseType {
    constructor(em, findCb) {
        this.em = em;
        this.findCb = findCb;
        this.find = (values, model) => __awaiter(this, void 0, void 0, function* () {
            const result = yield findCb(values);
            return this.convertResult(result, model);
        });
    }
    setEntityManager(em) {
        this.em = em;
    }
    convertResult(result, model) {
        if (typeof result === 'undefined') {
            throw new Error('add convertResult method');
        }
        if (typeof model === 'undefined') {
            throw new Error('add convertResult method');
        }
        return new Proxy({}, {});
    }
    getResultProxy(model, storageModel, value) {
        return this.em._createProxy(model, model, value, () => __awaiter(this, void 0, void 0, function* () {
            const result = yield model.getRepository().methodsCb.findByPk(value);
            storageModel[value] = result;
            return result;
        }));
    }
}
//# sourceMappingURL=BaseType.js.map