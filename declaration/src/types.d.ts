import BaseField from "./fields/BaseField";
import EntityManager from "./EntityManager";
export declare type BaseModel = {
    $em: EntityManager;
    _pkName: string | null;
    $getPkName: () => string;
    _name: string | null;
    $setName: (value: string) => void;
    $getName: () => string;
    $get: (pk: number | string) => Promise<any>;
    $create: (value: any, commit: any) => Promise<number | string>;
    $update: (value: any, commit: any) => Promise<number | string>;
    $delete: (pk: number | string, commit: any) => Promise<number | string>;
    $refresh: (pk: number | string) => void;
};
export declare type ModelData = BaseModel & {
    [key: string]: string | number | null | boolean | Array<any> | object;
};
export declare type ModelView = BaseModel & {
    _target: ModelData;
};
export declare type ModelInit = {
    [key: string]: BaseField;
};
export declare type Model = BaseModel & ModelInit;
