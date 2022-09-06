import EntityManager from "../EntityManager";
import BaseField from "../fields/BaseField";
import PrimaryKey from "../fields/PrimaryKey";
import Repository from "../Repository";
interface Fields {
    [key: string]: any;
}
export default class BaseModel {
    [key: string]: BaseField | EntityManager | Fields | string | null | ((v: any, o1?: any, o2?: any) => any);
    pkName: string | null;
    em: EntityManager;
    _fields: Fields | null;
    constructor(em: EntityManager);
    getPkName(): string;
    getPkField(): PrimaryKey;
    getName(): any;
    getRepository(): Repository;
    validateFields(data: Fields): this;
    convertFields(data: any): Fields;
    get fields(): Fields;
}
export {};
