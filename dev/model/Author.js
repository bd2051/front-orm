import PrimaryKey from "../../src/fields/PrimaryKey";
import StringField from "../../src/fields/StringField";
import BaseModel from "../../src/model/BaseModel";
export default class Author extends BaseModel {
    constructor(em) {
        super(em);
        this.id = new PrimaryKey(em);
        this.name = new StringField(em);
        this.age = new StringField(em);
    }
}
//# sourceMappingURL=Author.js.map