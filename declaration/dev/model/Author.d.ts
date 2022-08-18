import { BaseModel, CollectionField, EntityManager, PrimaryKey, StringField } from "../../src";
export default class Author extends BaseModel {
    id: PrimaryKey;
    name: StringField;
    age: StringField;
    stories: CollectionField;
    constructor(em: EntityManager);
    update(values: object, oldItem: any): Promise<void>;
    refresh(storageModel: any, pk: string | number, done: () => void): void;
    cancelRefresh(storageModel: any, pk: string | number): Promise<void>;
}
