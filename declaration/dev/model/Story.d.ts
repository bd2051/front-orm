import { BaseModel, EntityField, EntityManager, PrimaryKey, StringField } from "../../src";
export default class Story extends BaseModel {
    id: PrimaryKey;
    name: StringField;
    author: EntityField;
    constructor(em: EntityManager);
    create(values: object): void;
    update(values: object, oldItem: any): Promise<void>;
    delete(pk: string | number): Promise<void>;
    refresh(pk: string | number, done: () => void): void;
    cancelRefresh(pk: string | number): Promise<void>;
}
