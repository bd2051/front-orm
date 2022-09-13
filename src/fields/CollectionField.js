var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseField from "./BaseField";
export default class CollectionField extends BaseField {
    constructor(em, targetModelName, convertValueToPk = (value) => value) {
        super(em);
        this.targetModelName = targetModelName;
        this.convertValueToPk = convertValueToPk;
    }
    get targetModel() {
        return this.em.getModel(this.targetModelName);
    }
    // validate(value: any) {
    //   if (!Array.isArray(value)) {
    //     return false
    //   }
    //   // return value.every((element) => this.targetModel.getPkField().validate(this.convertValueToPk(element)))
    //   return true
    // }
    // convert(data: any, key: string) {
    //   const value = data[key]
    //   if (!Array.isArray(value)) {
    //     return false
    //   }
    //   return this.em._createArrayProxy(
    //     value,
    //     this.targetModel,
    //     this.convertValueToPk
    //   )
    // }
    view(values) {
        return new Proxy(values.map((value) => {
            const weakCacheKey = this.em.reverseStorageCache.get(value);
            if (typeof weakCacheKey === 'undefined') {
                throw new Error('Logic error');
            }
            const cacheKey = weakCacheKey.deref();
            if (typeof cacheKey === 'undefined') {
                throw new Error('Unexpected use of WeakRef');
            }
            const pk = cacheKey.pk;
            let cb = (done) => __awaiter(this, void 0, void 0, function* () {
                done();
            });
            if (typeof pk !== 'undefined') {
                const model = this.targetModel;
                const findByPk = model.$getRepository().methodsCb.findByPk;
                cb = (done) => __awaiter(this, void 0, void 0, function* () {
                    const result = yield findByPk(pk);
                    this.em.setStorageValue(model, pk, result);
                    done();
                });
            }
            return this.em._createProxyByCacheKey(cacheKey, cb);
        }), {
            get(target, prop, receiver) {
                if (['push', 'pop', 'shift', 'unshift'].includes(prop)) {
                    throw new Error('Use update method');
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }
    link(values) {
        return values.map((value) => {
            const pk = this.convertValueToPk(value);
            const cacheKey = this.em.getStorageModel(this.targetModel.$getName())[pk];
            if (typeof cacheKey === 'undefined') {
                return this.em.setStorageValue(this.targetModel, pk, {
                    [this.targetModel.$getPkName()]: pk
                });
            }
            return this.em.storageCache.get(cacheKey);
        });
    }
}
