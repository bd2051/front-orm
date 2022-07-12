import BaseField from "./BaseField";
export default class PrimaryKey extends BaseField {
    constructor(em, type = 'number') {
        super(em);
        this.type = type;
    }
    validate(value) {
        if (value !== null) {
            return true;
        }
        return typeof value === this.type;
    }
}
//# sourceMappingURL=PrimaryKey.js.map