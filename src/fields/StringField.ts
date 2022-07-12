import BaseField from "./BaseField";

export default class StringField extends BaseField{
  validate(value: any) {
    return typeof value === 'string'
  }
}
