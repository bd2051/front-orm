import BaseField from "./BaseField";

export default class PrimaryKey extends BaseField{
  constructor(type = 'number') {
    super();
    this.type = type
  }
  validate(value) {
    if (value !== null) {
      return true
    }
    return typeof value === this.type
  }
}
