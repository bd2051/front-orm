import BaseField from "../fields/BaseField";
import PrimaryKey from "../fields/PrimaryKey";
export default class BaseModel {
    constructor(em) {
        this.pkName = null;
        this.em = em;
    }
    getPkName() {
        if (this.pkName === null) {
            const pkName = Object.keys(this).find((key) => this[key] instanceof PrimaryKey);
            if (typeof pkName !== 'string') {
                throw new Error('Add PrimaryKey');
            }
            this.pkName = pkName;
        }
        return this.pkName;
    }
    getPkField() {
        const pkName = this.getPkName();
        let pkFields;
        const temp = this[pkName];
        if (temp instanceof PrimaryKey) {
            pkFields = temp;
        }
        return pkFields;
    }
    getName() {
        return this.constructor.name;
    }
    getRepository() {
        return this.em.getRepository(this.getName());
    }
    validateFields(data) {
        if (!Object.entries(data).every(([key, item]) => {
            const field = this[key];
            if (field instanceof BaseField) {
                return field.validate(item);
            }
            return true;
        })) {
            console.log(data);
            throw new Error('invalid fields');
        }
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
        return this.em.hooks.create(this, values);
    }
    cancelCreate(pk) {
        const createListModel = this.em.getCreateListModel(this.getName());
        delete createListModel[pk];
    }
    update(values, oldItem) {
        return this.em.hooks.update(this, values, oldItem);
    }
    cancelUpdate(pk) {
        const updateListModel = this.em.getUpdateListModel(this.getName());
        delete updateListModel[pk];
    }
    delete(pk, oldItem) {
        return this.em.hooks.delete(this, pk, oldItem);
    }
    cancelDelete(pk) {
        const deleteListModel = this.em.getDeleteListModel(this.getName());
        delete deleteListModel[pk];
    }
    refresh(storageModel, pk, done) {
        return this.em.hooks.refresh(this, storageModel, pk, done);
    }
    cancelRefresh(storageModel, pk) {
        return this.em.hooks.cancelRefresh(this, storageModel, pk);
    }
    getWorkingModel(pkValue) {
        const workingModel = Object.entries(this)
            .filter(([, value]) => value instanceof BaseField)
            .reduce((acc, [key,]) => {
            acc[key] = {
                type: 'storage',
                value: this.em.pending
            };
            return acc;
        }, {});
        if (typeof pkValue !== 'undefined') {
            workingModel[this.getPkName()] = {
                type: 'storage',
                value: pkValue
            };
        }
        return workingModel;
    }
}
