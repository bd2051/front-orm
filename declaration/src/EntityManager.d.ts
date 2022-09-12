import { Repository, getBaseModel, BaseType, BaseField, Entity, EntityField, CollectionField } from "./index";
import { Diff } from "deep-diff";
import { Model, ModelData, ModelInit, ModelView } from "./types";
interface Models {
    [key: string]: Model;
}
interface RepositoryInit {
    findByPk: Entity;
    [key: string]: BaseType;
}
interface Repositories {
    [key: string]: Repository;
}
interface StorageItem {
    [key: string]: any;
}
interface Cache {
    [key: string]: object;
}
interface CommonClasses {
    [key: string]: typeof getBaseModel | typeof Repository;
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
interface PutValue {
    [key: string]: string | number | null | Array<ModelView> | ModelView | boolean;
}
interface CacheKey {
    pk?: string | number;
}
interface Commit {
    cacheKey: CacheKey;
    diffs: Array<Diff<any, any>>;
}
interface Hooks {
    preFlush: (commits: Array<Commit>) => Array<Commit>;
    create: (data: ModelData, value: any, commit: Commit) => Promise<string | number>;
    update: (data: ModelData, value: any, commit: Commit) => Promise<string | number>;
}
interface HooksInit {
    preFlush?: (commits: Array<Commit>) => Array<Commit>;
    create: (data: ModelData, value: any, commit: Commit) => Promise<string | number>;
    update: (data: ModelData, value: any, commit: Commit) => Promise<string | number>;
}
interface FirstLevelStorage {
    [key: string | number]: CacheKey;
}
interface Storage {
    [key: string]: FirstLevelStorage;
}
export default class EntityManager {
    models: Models;
    repositories: Repositories;
    storage: Storage;
    cache: Cache;
    commits: Array<Commit>;
    storageCache: WeakMap<CacheKey, ModelData>;
    reverseStorageCache: WeakMap<ModelData, CacheKey>;
    hooks: Hooks;
    pending: any;
    defaultClasses: Classes;
    constructor();
    setHooks(hooks: HooksInit): void;
    setModel(getModelInit: (em: EntityManager) => ModelInit, repositories: RepositoryInit): void;
    getModel(modelName: string): Model;
    getRepository(modelName: string): Repository;
    getStorageModel(modelName: string): FirstLevelStorage;
    setStorageValue(model: Model, pk: number | string, value: StorageItem): ModelData;
    _convertValueToPropertyDescriptorMap(entries: Array<Array<any>>): PropertyDescriptorMap;
    put(value: PutValue, target: ModelView | Model): ModelView;
    flush(): Promise<void>;
    _createProxyByCacheKey(cacheKey: CacheKey, cb?: (done: () => void) => void, done?: () => void): ModelView;
    _createProxy(model: Model, pk: string | number, cb: (done: () => void) => void): ModelView;
}
export {};
