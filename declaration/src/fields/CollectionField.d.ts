import BaseField from "./BaseField";
import BaseModel from "../model/BaseModel";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
export default class CollectionField extends BaseField implements FieldInterface {
    targetModelName: string;
    convertValueToPk: (value: any) => number | string;
    model: BaseModel;
    constructor(em: EntityManager, model: BaseModel, targetModelName: string, convertValueToPk?: (value: any) => number | string);
    get targetModel(): BaseModel;
    validate(value: any): boolean;
    convert(data: any, key: string): any;
}
