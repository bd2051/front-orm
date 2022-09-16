import BaseType from "./types/BaseType";
import EntityManager from "./EntityManager";
import { Model } from "./types";
interface MethodsCb {
    findByPk: (value: any) => object;
    [key: string]: (value: any) => object;
}
interface Repositories {
    [key: string]: BaseType;
}
export default class Repository {
    [key: string]: Model | EntityManager | MethodsCb | BaseType | ((v: any, o1?: any, o2?: any) => any);
    model: Model;
    em: EntityManager;
    methodsCb: MethodsCb;
    constructor(em: EntityManager, model: Model, repositories: Repositories);
    _sortJsonStringify(obj: object): string;
    _methodsHandler(values: any, methodRepository: BaseType): Promise<any>;
}
export {};
