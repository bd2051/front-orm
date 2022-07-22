import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
export default class PrimaryKey extends BaseField implements FieldInterface {
    type: 'number' | 'string';
    constructor(em: EntityManager, type?: 'number' | 'string');
    validate(value: string | number | null): boolean;
}