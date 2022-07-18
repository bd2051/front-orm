import BaseField from "../fields/BaseField";
import PrimaryKey from "../fields/PrimaryKey";
export default class BaseModel {
    constructor(em) {
        this.pk = null;
        this.em = em;
    }
    getPk() {
        if (this.pk === null) {
            const pk = Object.keys(this).find((key) => this[key] instanceof PrimaryKey);
            if (typeof pk !== 'string') {
                throw new Error('Add PrimaryKey');
            }
            this.pk = pk;
        }
        return this.pk;
    }
    getPkField() {
        const pk = this.getPk();
        let pkFields;
        const temp = this[pk];
        if (temp instanceof PrimaryKey) {
            pkFields = temp;
        }
        else {
            throw new Error('Logic error');
        }
        return pkFields;
    }
    getName() {
        return this.constructor.name;
    }
    getRepository() {
        const repository = this.em.repositories[this.getName()];
        if (typeof repository === 'undefined') {
            throw new Error('Logic error');
        }
        return repository;
    }
    validateFields(data) {
        console.log(data);
        return this;
    }
    convertFields(data) {
        return Object.keys(data).reduce((acc, key) => {
            const field = this[key];
            if (field instanceof BaseField) {
                acc[key] = field.convert(data[key]);
            }
            return acc;
        }, {});
    }
    create(values) {
        console.log(values);
    }
    update(values, oldItem) {
        console.log(oldItem, values);
    }
    delete(pk, oldItem) {
        console.log(oldItem, pk);
    }
    refresh(storageModel, pk) {
        console.log(storageModel, pk);
    }
}
//# sourceMappingURL=BaseModel.js.map