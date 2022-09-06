import BaseField from "../fields/BaseField";
import PrimaryKey from "../fields/PrimaryKey";
export default class BaseModel {
    constructor(em) {
        this.pkName = null;
        this.em = em;
        this._fields = null;
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
        if (this.constructor.name === 'Object') {
            return Object.getPrototypeOf(this).getName();
        }
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
                acc[key] = field.convert(data, key);
            }
            return acc;
        }, {});
    }
    get fields() {
        if (this._fields === null) {
            this._fields = Object.entries(this)
                .filter(([, value]) => value instanceof BaseField)
                .reduce((acc, [key]) => {
                acc[key] = true;
                return acc;
            }, {});
        }
        return this._fields;
    }
}
