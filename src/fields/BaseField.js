export default class BaseField {
    constructor(em) {
        this.em = em;
    }
    convert(value) {
        return value;
    }
    validate(value) {
        if (!value) {
            throw new Error('Logic error');
        }
        return this;
    }
}
//# sourceMappingURL=BaseField.js.map