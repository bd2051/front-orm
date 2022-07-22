import BaseType from "./BaseType";
import BaseModel from "../model/BaseModel";
interface Result {
    [key: string | number]: any;
}
export default class Entity extends BaseType {
    convertResult(result: Result, model: BaseModel): any;
}
export {};
