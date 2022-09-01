import BaseField from "./BaseField";
export default class CollectionField extends BaseField {
    constructor(em, model, targetModelName, convertValueToPk = (value) => value) {
        super(em);
        this.targetModelName = targetModelName;
        this.convertValueToPk = convertValueToPk;
        this.model = model;
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
}
