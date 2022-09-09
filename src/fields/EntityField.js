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
export default class EntityField extends BaseField {
    constructor(em, targetModelName, convertValueToPk = (value) => value) {
        super(em);
        this.targetModelName = targetModelName;
        this.convertValueToPk = convertValueToPk;
    }
    get targetModel() {
        return this.em.getModel(this.targetModelName);
    }
    // validate(value: any) {
    //   if (value === null) {
    //     return true
    //   }
    //   return this.targetModel.$getPkField().validate(this.convertValueToPk(value))
    // }
    // convert(data: any, key: string) {
    //   const value = data[key]
    //   if (value === null) {
    //     return null
    //   }
    //   const pk = this.convertValueToPk(value)
    //   const model = this.targetModel
    //   const findByPk = model.$getRepository().methodsCb.findByPk
    //   return this.em._createProxy(model, pk, async (done) => {
    //     const result = await findByPk(pk)
    //     this.em.setStorageValue(model, pk, result)
    //     done()
    //   })
    // }
    view(value) {
        const cacheKey = this.em.reverseStorageCache.get(value);
        if (typeof cacheKey === 'undefined') {
            throw new Error('Logic error');
        }
        const pk = cacheKey.pk;
        let cb = (done) => __awaiter(this, void 0, void 0, function* () { done(); });
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
    }
    link(value) {
        const pk = this.convertValueToPk(value);
        const cacheKey = this.em.getStorageModel(this.targetModel.$getName())[pk];
        if (typeof cacheKey === 'undefined') {
            return this.em.setStorageValue(this.targetModel, pk, {
                [this.targetModel.$getPkName()]: pk
            });
        }
        return this.em.storageCache.get(cacheKey);
    }
}
