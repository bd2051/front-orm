import BaseType from "./BaseType";
export default class Collection extends BaseType {
    convertResult(result, model) {
        if (!Array.isArray(result)) {
            throw new Error('Invalid result. The result must be array');
        }
        if (result.some(item => !item[model.getPkName()])) {
            throw new Error('Invalid result. Missing primary key');
        }
        const storageModel = this.em.storage[model.getName()];
        if (typeof storageModel === 'undefined') {
            throw new Error('Invalid storageModel');
        }
        result.forEach((item) => {
            storageModel[item[model.getPkName()]] = item;
        });
        return result.map(item => this.getResultProxy(model, storageModel, item[model.getPkName()]));
    }
}
