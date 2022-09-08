import BaseField from "./fields/BaseField";
import EntityManager from "./EntityManager";
import PrimaryKey from "./fields/PrimaryKey";
import Repository from "./Repository";

// interface Fields {
//   [key: string]: any
// }

export type BaseModel = {
  $em: EntityManager
  _pkName: string | null
  $getPkName: () => string
  $getPkField: () => PrimaryKey
  _name: string | null
  $setName: (value: string) => void
  $getName: () => string
  // $validateFields: (data: Fields) => BaseModel
  // $convertFields: (data: Fields) => any
  $getRepository: () => Repository
}

export type ModelData = BaseModel & {
  [key: string]: string | number | null | boolean | Array<any> | object
}

export type ModelView = BaseModel & {
  _target: ModelData
}

export type ModelInit = {
  [key: string]: BaseField
}

export type Model = BaseModel & ModelInit
