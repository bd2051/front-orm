import { BaseModel, CollectionField, EntityManager, PrimaryKey, StringField } from "../../src";
export default class Author extends BaseModel {
    id: PrimaryKey;
    name: StringField;
    age: StringField;
    stories: CollectionField;
    constructor(em: EntityManager);
    update(values: object, oldItem: any): Promise<void>;
    refresh(pk: string | number, done: () => void): void;
    cancelRefresh(pk: string | number): Promise<void>;
}
