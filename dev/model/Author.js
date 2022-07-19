import PrimaryKey from "../../src/fields/PrimaryKey";
import StringField from "../../src/fields/StringField";
import BaseModel from "../../src/model/BaseModel";
import NumberField from "../../src/fields/NumberField";
export default class Author extends BaseModel {
    constructor(em) {
        super(em);
        this.id = new PrimaryKey(em);
        this.name = new StringField(em);
        this.age = new NumberField(em);
    }
}
//# sourceMappingURL=Author.js.map