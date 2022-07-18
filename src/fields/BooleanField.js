import BaseField from "./BaseField";
export default class NumberField extends BaseField {
    validate(value) {
        return typeof value === 'boolean';
    }
}
//# sourceMappingURL=BooleanField.js.map