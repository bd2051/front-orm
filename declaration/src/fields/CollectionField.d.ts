import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
import { Model, ModelData, ModelView } from "../types";
export default class CollectionField extends BaseField implements FieldInterface {
    targetModelName: string;
    convertValueToPk: (value: any) => number | string;
    constructor(em: EntityManager, targetModelName: string, convertValueToPk?: (value: any) => number | string);
    get targetModel(): Model;
    view(values: Array<ModelData>): Array<ModelView>;
    link(values: any): any;
}
