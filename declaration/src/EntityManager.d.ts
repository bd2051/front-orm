import { Repository, BaseModel, BaseType, BaseField, Entity, EntityField } from "./index";
interface StorageModel {
    [key: number | string]: any;
}
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
interface Cache {
    [key: string]: object;
}
interface List {
    [key: string]: any;
}
interface WorkingField {
    type: 'storage' | 'updated' | 'pending';
    value: any;
}
interface WorkingModel {
    [key: string]: WorkingField;
}
interface WorkingModelList {
    [key: string]: WorkingModel;
}
interface CommonClasses {
    [key: string]: typeof BaseModel | typeof Repository;
}
interface FieldsClass {
    [key: string]: typeof BaseField | typeof EntityField;
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
    create: (model: BaseModel, values: object) => any;
    update: (model: BaseModel, values: object, oldItem: object) => any;
    delete: (model: BaseModel, pk: number | string, oldItem: object) => any;
    refresh: (model: BaseModel, storageModel: StorageModel, pk: number | string, done: () => void) => any;
    cancelRefresh: (model: BaseModel, storageModel: StorageModel, pk: number | string) => any;
}
export default class EntityManager {
    models: Models;
    repositories: Repositories;
    storage: Storage;
    updateList: Storage;
    createList: Storage;
    deleteList: Storage;
    workingModels: WorkingModelList;
    cache: Cache;
    hooks: Hooks;
    pending: any;
    defaultClasses: Classes;
    constructor();
    setHooks(hooks: Hooks): void;
    setModel(model: BaseModel, repositories: RepositoryInit): void;
    getModel(modelName: string): BaseModel;
    getRepository(modelName: string): Repository;
    getStorageModel(modelName: string): FirstLevelStorage;
    getCreateListModel(modelName: string): List;
    getUpdateListModel(modelName: string): List;
    getDeleteListModel(modelName: string): List;
    flush(): Promise<void>;
    _createProxy(model: BaseModel, pk: string | number, cb: (done: () => void) => void): any;
}
export {};
