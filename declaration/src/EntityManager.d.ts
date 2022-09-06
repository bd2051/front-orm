import { Repository, BaseModel, BaseType, BaseField, Entity, EntityField, CollectionField } from "./index";
import { Diff } from "deep-diff";
interface Models {
    [key: string]: BaseModel;
}
interface RepositoryInit {
    findByPk: Entity;
    [key: string]: BaseType;
}
interface Repositories {
    [key: string]: Repository;
}
interface FirstLevelStorage {
    [key: string | number]: any;
}
interface Storage {
    [key: string]: FirstLevelStorage;
}
interface StorageItem {
    [key: string]: any;
}
interface Cache {
    [key: string]: object;
}
interface CommonClasses {
    [key: string]: typeof BaseModel | typeof Repository;
}
interface FieldsClass {
    [key: string]: typeof BaseField | typeof EntityField | typeof CollectionField;
}
interface TypesClass {
    [key: string]: typeof BaseType;
}
interface Classes {
    common: CommonClasses;
    fields: FieldsClass;
    types: TypesClass;
}
interface Hooks {
}
interface PutValue {
    [key: string]: any;
}
interface PutTarget {
    [key: string]: string | number | BaseField | ((v?: any) => any);
    getPkName: () => string;
    getName: () => string;
    validateFields: (v: any) => BaseModel;
}
interface Commit {
    cacheKey: object;
    diffs: Array<Diff<any, any>>;
}
export default class EntityManager {
    models: Models;
    repositories: Repositories;
    storage: Storage;
    cache: Cache;
    commits: Array<Commit>;
    storageCache: WeakMap<any, any>;
    hooks: Hooks;
    pending: any;
    defaultClasses: Classes;
    constructor();
    setHooks(hooks: Hooks): void;
    setModel(model: BaseModel, repositories: RepositoryInit): void;
    getModel(modelName: string): BaseModel;
    getRepository(modelName: string): Repository;
    getStorageModel(modelName: string): FirstLevelStorage;
    setStorageValue(model: BaseModel, pk: number | string, value: StorageItem): void;
    put(value: PutValue, target: PutTarget | BaseModel): any;
    flush(): Promise<void>;
    _createProxyByCacheKey(cacheKey: object, model: PutTarget | BaseModel, cb?: (done: () => void) => void, done?: () => void): any;
    _createProxy(model: BaseModel, pk: string | number, cb: (done: () => void) => void): any;
    _createArrayProxy(arrayTarget: Array<number | string>, targetModel: BaseModel, convertValueToPk: (value: any) => number | string): any;
}
export {};
