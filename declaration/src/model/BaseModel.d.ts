import EntityManager from "../EntityManager";
import BaseField from "../fields/BaseField";
import PrimaryKey from "../fields/PrimaryKey";
import Repository from "../Repository";
interface Fields {
    [key: string]: any;
}
interface StorageModel {
    [key: number | string]: any;
}
export default class BaseModel {
    [key: string]: BaseField | EntityManager | string | null | ((v: any, o?: any) => any);
    pkName: string | null;
    em: EntityManager;
    constructor(em: EntityManager);
    getPkName(): string;
    getPkField(): PrimaryKey;
    getName(): string;
    getRepository(): Repository;
    validateFields(data: Fields): this;
    convertFields(data: any): Fields;
    create(values: object): any;
    cancelCreate(pk: number | string): void;
    update(values: object, oldItem: object): any;
    cancelUpdate(pk: number | string): void;
    delete(pk: number | string, oldItem: object): any;
    cancelDelete(pk: number | string): void;
    refresh(storageModel: StorageModel, pk: number | string): any;
    cancelRefresh(storageModel: StorageModel, pk: number | string): any;
}
export {};
