import EntityManager from "../EntityManager";
export default class BaseField {
    em: EntityManager;
    constructor(em: EntityManager);
    convert(data: any, key: string): any;
    validate(value: any): boolean;
}
