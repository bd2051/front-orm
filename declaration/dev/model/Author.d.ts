import { BaseModel, EntityManager, PrimaryKey, StringField } from "../../src";
export default class Author extends BaseModel {
    id: PrimaryKey;
    name: StringField;
    age: StringField;
    constructor(em: EntityManager);
}
