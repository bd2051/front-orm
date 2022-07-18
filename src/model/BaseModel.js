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
        if (!Object.entries(data).every(([key, item]) => {
            const field = this[key];
            if (field instanceof BaseField) {
                return field.validate(item);
            }
        })) {
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
        return this.em.hooks.create(values);
    }
    cancelCreate(pk) {
        const createListModel = this.em.createList[this.getName()];
        if (typeof createListModel === 'undefined') {
            throw new Error('Logic error');
        }
        delete createListModel[pk];
    }
    update(values, oldItem) {
        return this.em.hooks.update(values, oldItem);
    }
    cancelUpdate(pk) {
        const updateListModel = this.em.updateList[this.getName()];
        if (typeof updateListModel === 'undefined') {
            throw new Error('Logic error');
        }
        delete updateListModel[pk];
    }
    delete(pk, oldItem) {
        return this.em.hooks.delete(pk, oldItem);
    }
    cancelDelete(pk) {
        const deleteListModel = this.em.deleteList[this.getName()];
        if (typeof deleteListModel === 'undefined') {
            throw new Error('Logic error');
        }
        delete deleteListModel[pk];
    }
    refresh(storageModel, pk) {
        return this.em.hooks.refresh(storageModel, pk);
    }
    cancelRefresh(storageModel, pk) {
        return this.em.hooks.cancelRefresh(storageModel, pk);
    }
}
//# sourceMappingURL=BaseModel.js.map