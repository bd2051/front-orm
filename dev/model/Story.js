var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseModel, EntityField, PrimaryKey, StringField } from "../../src";
import Author from "./Author";
const intervalMap = {};
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
    update(values, oldItem) {
        return __awaiter(this, void 0, void 0, function* () {
            fetch(`http://localhost:8000/api/stories`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Object.assign(Object.assign({}, oldItem), values))
            }).then(response => response.json())
                .then((data) => {
                console.log(data);
                return data;
            });
        });
    }
    delete(pk) {
        return __awaiter(this, void 0, void 0, function* () {
            fetch(`http://localhost:8000/api/stories/${pk}`, {
                method: 'DELETE',
            }).then(response => response.json())
                .then((data) => {
                console.log(data);
                return data;
            });
        });
    }
    refresh(storageModel, pk, done) {
        intervalMap[pk] = setInterval(() => {
            fetch(`http://localhost:8000/api/stories/${pk}`).then(response => response.json())
                .then((data) => {
                storageModel[pk] = data;
                done();
            });
        }, 1000);
    }
    cancelRefresh(storageModel, pk) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(storageModel);
            clearInterval(intervalMap[pk]);
        });
    }
}
