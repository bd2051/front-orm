import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";

export default class BooleanField extends BaseField implements FieldInterface {
  validate(value: any) {
    return typeof value === 'boolean'
  }
}
