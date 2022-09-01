import EntityManager from "../EntityManager";
import BaseModel from "../model/BaseModel";
export default class BaseType {
    em: EntityManager;
    findCb: (values: any) => object;
    find: (values: any, model: BaseModel) => Promise<any>;
    constructor(em: EntityManager, findCb: (values: any) => object);
    setEntityManager(em: EntityManager): void;
    convertResult(result: object, model: BaseModel): any;
    getResultProxy(model: BaseModel, value: number | string): any;
}
