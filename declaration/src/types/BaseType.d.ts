import EntityManager from "../EntityManager";
import { Model } from "../types";
export default class BaseType {
    em: EntityManager;
    findCb: (values: any) => object;
    find: (values: any, model: Model) => Promise<any>;
    constructor(em: EntityManager, findCb: (values: any) => object);
    setEntityManager(em: EntityManager): void;
    convertResult(result: object, model: Model): any;
    getResultProxy(model: Model, value: number | string): any;
}
