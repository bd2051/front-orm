import BaseField from "./fields/BaseField";
import EntityManager from "./EntityManager";
import PrimaryKey from "./fields/PrimaryKey";
import Repository from "./Repository";
export declare type BaseModel = {
    $em: EntityManager;
    _pkName: string | null;
    $getPkName: () => string;
    $getPkField: () => PrimaryKey;
    _name: string | null;
    $setName: (value: string) => void;
    $getName: () => string;
    $getRepository: () => Repository;
};
export declare type ModelData = BaseModel & {
    [key: string]: string | number;
};
export declare type ModelView = BaseModel & {
    _target: ModelData;
};
export declare type ModelInit = {
    [key: string]: BaseField;
};
export declare type Model = BaseModel & ModelInit;
