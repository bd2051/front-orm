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
    validate(value) {
        if (!Array.isArray(value)) {
            return false;
        }
        // return value.every((element) => this.targetModel.getPkField().validate(this.convertValueToPk(element)))
        return true;
    }
    convert(data, key) {
        const value = data[key];
        if (!Array.isArray(value)) {
            return false;
        }
        return this.em._createArrayProxy(value, this.targetModel, this.convertValueToPk);
    }
    link(values) {
        return values.map((value) => this.em.setStorageValue(this.targetModel, this.convertValueToPk(value), value));
    }
}
