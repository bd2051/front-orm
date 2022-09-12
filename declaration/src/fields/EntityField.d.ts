import BaseField from "./BaseField";
import FieldInterface from "./FieldInterface";
import EntityManager from "../EntityManager";
import { Model, ModelData, ModelView } from "../types";
export default class EntityField extends BaseField implements FieldInterface {
    targetModelName: string;
    convertValueToPk: (value: any) => number | string;
    constructor(em: EntityManager, targetModelName: string, convertValueToPk?: (value: any) => number | string);
    get targetModel(): Model;
    view(value: ModelData | null): ModelView | null;
    link(value: any): ModelData | null;
}
