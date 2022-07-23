import { BaseModel, NumberField, PrimaryKey, StringField } from "../../src";
export default class Author extends BaseModel {
    constructor(em) {
        super(em);
        this.id = new PrimaryKey(em);
        this.name = new StringField(em);
        this.age = new NumberField(em);
    }
}
