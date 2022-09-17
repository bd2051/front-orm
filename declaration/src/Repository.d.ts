import BaseType from "./types/BaseType";
import EntityManager from "./EntityManager";
import { Model } from "./types";
interface Repositories {
    [key: string]: BaseType;
}
export default class Repository {
    [key: string]: Model | EntityManager | BaseType | ((v: any, o1?: any, o2?: any) => any);
    model: Model;
    em: EntityManager;
    constructor(em: EntityManager, model: Model, repositories: Repositories);
    _methodsHandler(values: any, methodRepository: BaseType): Promise<any>;
}
export {};
