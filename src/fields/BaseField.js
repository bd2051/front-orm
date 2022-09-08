export default class BaseField {
    constructor(em) {
        this.em = em;
    }
    convert(data, key) {
        return data[key];
    }
    validate(value) {
        return !(typeof value === 'undefined');
    }
    link(value) {
        return value;
    }
}
