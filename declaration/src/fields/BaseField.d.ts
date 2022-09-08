import EntityManager from "../EntityManager";
export default class BaseField {
    em: EntityManager;
    constructor(em: EntityManager);
    view(value: any): any;
    link(value: any): any;
}
