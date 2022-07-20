export default class BaseField {
    constructor(em) {
        this.em = em;
    }
    convert(value) {
        return value;
    }
    validate(value) {
        return !(typeof value === 'undefined');
    }
}
//# sourceMappingURL=BaseField.js.map