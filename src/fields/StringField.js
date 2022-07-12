import BaseField from "./BaseField";
export default class StringField extends BaseField {
    validate(value) {
        return typeof value === 'string';
    }
}
//# sourceMappingURL=StringField.js.map