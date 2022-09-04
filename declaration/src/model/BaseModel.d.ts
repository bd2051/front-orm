import EntityManager from "../EntityManager";
import BaseField from "../fields/BaseField";
import PrimaryKey from "../fields/PrimaryKey";
import Repository from "../Repository";
interface Fields {
    [key: string]: any;
}
export default class BaseModel {
    [key: string]: BaseField | EntityManager | string | null | ((v: any, o1?: any, o2?: any) => any);
    pkName: string | null;
    em: EntityManager;
    constructor(em: EntityManager);
    getPkName(): string;
    getPkField(): PrimaryKey;
    getName(): string;
    getRepository(): Repository;
    validateFields(data: Fields): this;
    convertFields(data: any): Fields;
    refresh(pk: number | string, done: () => void): any;
    cancelRefresh(pk: number | string): any;
    getWorkingModel(pkValue?: number | string): Fields;
}
export {};
