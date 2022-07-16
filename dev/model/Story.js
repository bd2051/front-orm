import PrimaryKey from "../../src/fields/PrimaryKey";
import StringField from "../../src/fields/StringField";
import EntityField from "../../src/fields/EntityField";
import Author from "./Author";
import BaseModel from "../../src/model/BaseModel";
export default class Story extends BaseModel {
    constructor(em) {
        super(em);
        this.id = new PrimaryKey(em);
        this.name = new StringField(em);
        this.author = new EntityField(em, Author.name);
    }
    create(values) {
        fetch(`http://localhost:8000/api/stories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
            .then((data) => {
            console.log(data);
            return data;
        });
    }
    update(values) {
        fetch(`http://localhost:8000/api/stories`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
            .then((data) => {
            console.log(data);
            return data;
        });
    }
}
//# sourceMappingURL=Story.js.map