import BaseField from "./BaseField";
import BaseModel from "../model/BaseModel";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
export default class CollectionField extends BaseField implements FieldInterface {
    targetModelName: string;
    convertValueToPk: (value: any) => number | string;
    constructor(em: EntityManager, targetModelName: string, convertValueToPk?: (value: any) => number | string);
    get targetModel(): BaseModel;
    validate(value: any): boolean;
    convert(value: any): false | any[];
}
