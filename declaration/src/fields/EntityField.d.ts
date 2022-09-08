import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
import { Model } from "../types";
export default class EntityField extends BaseField implements FieldInterface {
    targetModelName: string;
    convertValueToPk: (value: any) => number | string;
    constructor(em: EntityManager, targetModelName: string, convertValueToPk?: (value: any) => number | string);
    get targetModel(): Model;
    validate(value: any): boolean;
    convert(data: any, key: string): any;
}
