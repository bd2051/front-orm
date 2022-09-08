import BaseType from "./BaseType";
export default class Entity extends BaseType {
    convertResult(result, model) {
        const pkValue = result[model.$getPkName()];
        if (typeof pkValue === 'undefined') {
            throw new Error('Invalid result. Missing primary key');
        }
        this.em.setStorageValue(model, pkValue, result);
        return this.getResultProxy(model, pkValue);
    }
}
