import BaseField from "./BaseField";

export default class NumberField extends BaseField{
  validate(value: any) {
    return typeof value === 'number'
  }
}
