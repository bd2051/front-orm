import EntityManager from "../EntityManager";
export default class BaseField {
    em: EntityManager;
    constructor(em: EntityManager);
    convert(value: any): any;
    validate(value: any): boolean;
}
