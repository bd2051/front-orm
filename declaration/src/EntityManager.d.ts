import Repository from "./Repository.js";
import BaseModel from "./model/BaseModel";
import BaseType from "./types/BaseType";
import Entity from "./types/Entity";
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
interface Hooks {
    create: (values: object) => any;
    update: (values: object, oldItem: object) => any;
    delete: (pk: number | string, oldItem: object) => any;
    refresh: (storageModel: StorageModel, pk: number | string, done: () => void) => any;
    cancelRefresh: (storageModel: StorageModel, pk: number | string) => any;
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
