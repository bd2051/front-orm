import { getBaseModel, BaseType, BaseField, EntityField, CollectionField } from "./index";
import { Diff } from "deep-diff";
import { Model, ModelData, ModelInit, ModelView, Repository } from "./types";
import getBaseRepository from "./repository/getBaseRepository";
interface Models {
    [key: string]: Model;
}
interface RepositoryInit {
    [key: string]: BaseType;
}
interface Repositories {
    [key: string]: Repository;
}
interface StorageItem {
    [key: string]: any;
}
interface CommonClasses {
    [key: string]: typeof getBaseModel | typeof getBaseRepository;
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
    promise?: Promise<any>;
}
interface Meta {
    options: any;
    method: (v: any, model: Model) => Promise<any>;
    repository: Repository;
    promise: null | Promise<any>;
}
interface Commit {
    cacheKey: CacheKey;
    diffs: Array<Diff<any, any>>;
}
interface Hooks {
    preFlush: (commits: Array<Commit>) => Array<Commit>;
    get: (data: Model, pk: string | number) => Promise<any>;
    create: (modelData: ModelData, value: any) => Promise<string | number>;
    update: (modelData: ModelData, value: any) => Promise<string | number>;
    delete: (modelData: ModelData, pk: string | number) => Promise<string | number>;
}
interface HooksInit {
    preFlush?: (commits: Array<Commit>) => Array<Commit>;
    get: (data: Model, pk: string | number) => Promise<any>;
    create: (data: ModelData, value: any) => Promise<string | number>;
    update: (data: ModelData, value: any) => Promise<string | number>;
    delete: (data: ModelData, pk: string | number) => Promise<string | number>;
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
    collectionCache: WeakMap<Array<any>, Meta>;
    _setReactivity: <Type>(value: Type) => Type;
    reverseStorageCache: WeakMap<ModelData, WeakRef<CacheKey>>;
    hooks: Hooks;
    pending: any;
    removed: any;
    defaultClasses: Classes;
    onAddModelData: (model?: Model, pk?: number | string) => void;
    onAddCollection: (repository?: Repository, collection?: WeakRef<Array<any>>) => void;
    constructor(setReactivity?: <Type>(value: Type) => Type);
    setHooks(hooks: HooksInit): void;
    setModel(getModelInit: (em: EntityManager) => ModelInit, repositories: RepositoryInit): void;
    getModel(modelName: string): Model;
    getRepository(modelName: string): Repository;
    getStorageModel(modelName: string): FirstLevelStorage;
    _createEmptyModelData(model: Model): ModelData;
    setStorageValue(model: Model, pk: number | string, value: StorageItem): ModelData;
    _convertValueToPropertyDescriptorMap(entries: Array<Array<any>>): PropertyDescriptorMap;
    _convertValue(value: PutValue): ConvertedPutValue;
    put(value: PutValue, target: ModelView | Model): ModelView;
    post(value: PutValue, model: Model): ModelView;
    remove(modelView: ModelView): ModelView;
    flush(): Promise<void>;
    revert(count?: number): void;
    revertAll(): void;
    checkModelDataByPk(model: Model, pk: string | number): Boolean;
    _updateDataByCommits(model: Model, pk: number | string, data: any): any;
    _createProxyByCacheKey(cacheKey: CacheKey, cb?: (done: () => void) => void, done?: () => void): ModelView;
    _createProxy(model: Model, pk: string | number, cb: (done: () => void) => void): ModelView;
}
export {};
