import BaseType from "./BaseType";
export default class Entity extends BaseType {
    convertResult(result, model) {
        const pkValue = result[model.getPkName()];
        if (typeof pkValue === 'undefined') {
            throw new Error('Invalid result. Missing primary key');
        }
        const storageModel = this.em.storage[model.getName()];
        if (typeof storageModel === 'undefined') {
            throw new Error('Invalid storageModel');
        }
        storageModel[pkValue] = result;
        return this.getResultProxy(model, storageModel, pkValue);
    }
}
