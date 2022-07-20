import BaseField from "./BaseField";
export default class BooleanField extends BaseField {
    validate(value) {
        return typeof value === 'boolean';
    }
}
//# sourceMappingURL=BooleanField.js.map