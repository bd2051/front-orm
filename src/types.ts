import BaseField from "./fields/BaseField";
import EntityManager from "./EntityManager";
import BaseType from "./types/BaseType";

export type BaseModel = {
  $em: EntityManager
  _pkName: string | null
  $getPkName: () => string
  _name: string | null
  $setName: (value: string) => void
  $getName: () => string
  $get: (pk: number | string) => Promise<any>
  $create: (value: any, commit: any) => Promise<number | string>,
  $update: (value: any, commit: any) => Promise<number | string>,
  $delete: (pk: number | string, commit: any) => Promise<number | string>,
  $refresh: (pk: number | string) => void
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

export type BaseRepository = {
  $em: EntityManager
  $model: Model
  $refreshCollection: (collection: Array<any>) => void
  _methodsHandler: (values: any, methodRepository: BaseType) => any
}

export type RepositoryInit = {
  [key: string]: BaseType
}

export type Repository = BaseRepository & RepositoryInit
