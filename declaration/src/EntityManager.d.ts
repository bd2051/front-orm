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
interface ConvertedPutValue {
    [key: string]: string | number | null | Array<ModelData> | ModelData | boolean;
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
    delete: (data: ModelData, pk: string | number, commit: Commit) => Promise<string | number>;
}
interface HooksInit {
    preFlush?: (commits: Array<Commit>) => Array<Commit>;
    create: (data: ModelData, value: any, commit: Commit) => Promise<string | number>;
    update: (data: ModelData, value: any, commit: Commit) => Promise<string | number>;
    delete: (data: ModelData, pk: string | number, commit: Commit) => Promise<string | number>;
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
    commits: Array<Commit>;
    storageCache: WeakMap<CacheKey, ModelData>;
    reverseStorageCache: WeakMap<ModelData, WeakRef<CacheKey>>;
    hooks: Hooks;
    pending: any;
    defaultClasses: Classes;
    constructor(storageCache?: WeakMap<CacheKey, ModelData>);
    setHooks(hooks: HooksInit): void;
    setModel(getModelInit: (em: EntityManager) => ModelInit, repositories: RepositoryInit): void;
    getModel(modelName: string): Model;
    getRepository(modelName: string): Repository;
    getStorageModel(modelName: string): FirstLevelStorage;
    setStorageValue(model: Model, pk: number | string, value: StorageItem): ModelData;
    _convertValueToPropertyDescriptorMap(entries: Array<Array<any>>): PropertyDescriptorMap;
    _convertValue(value: PutValue): ConvertedPutValue;
    put(value: PutValue, target: ModelView | Model): ModelView;
    post(value: PutValue, model: Model): ModelView;
    remove(modelView: ModelView): ModelView;
    flush(): Promise<void>;
    revert(count?: number): void;
    revertAll(): void;
    _createProxyByCacheKey(cacheKey: CacheKey, cb?: (done: () => void) => void, done?: () => void): ModelView;
    _createProxy(model: Model, pk: string | number, cb: (done: () => void) => void): ModelView;
}
export {};
