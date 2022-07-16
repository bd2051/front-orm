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
import BaseModel from "../model/BaseModel";
export default class EntityField extends BaseField {
    constructor(em, targetModelName) {
        super(em);
        this.targetModelName = targetModelName;
    }
    get targetModel() {
        if (!(this.em.models[this.targetModelName] instanceof BaseModel)) {
            throw new Error('Invalid target in Entity field');
        }
        return this.em.models[this.targetModelName];
    }
    validate(value) {
        return this.targetModel.getPkField().validate(value);
    }
    convert(value) {
        if (value === null) {
            return null;
        }
        let storageModel = this.em.storage[this.targetModel.getName()];
        if (typeof storageModel === 'undefined') {
            throw new Error('Invalid target in Entity field');
        }
        const model = this.targetModel;
        const findByPk = model.getRepository().methodsCb.findByPk;
        return this.em._createProxy(model, model, value, () => __awaiter(this, void 0, void 0, function* () {
            const result = yield findByPk(value);
            if (typeof storageModel === 'undefined') {
                throw new Error('Logic error');
            }
            storageModel[value] = model.validateFields(result).convertFields(result);
            return storageModel[value];
        }));
    }
}
//# sourceMappingURL=EntityField.js.map