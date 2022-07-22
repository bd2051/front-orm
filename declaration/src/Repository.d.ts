import BaseType from "./types/BaseType";
import BaseModel from "./model/BaseModel";
import EntityManager from "./EntityManager";
interface MethodsCb {
    findByPk: (value: any) => object;
    [key: string]: (value: any) => object;
}
interface Repositories {
    [key: string]: BaseType;
}
export default class Repository {
    [key: string]: BaseModel | EntityManager | MethodsCb | BaseType | ((v: any, o1?: any, o2?: any) => any);
    model: BaseModel;
    em: EntityManager;
    methodsCb: MethodsCb;
    constructor(em: EntityManager, model: BaseModel, repositories: Repositories);
    _sortJsonStringify(obj: object): string;
    create(values: any): Promise<any>;
    delete(pk: number | string): Promise<any>;
    _methodsHandler(values: any, methodRepository: BaseType, methodName: string): Promise<object>;
}
export {};
