import BaseType from "./BaseType";
import BaseModel from "../model/BaseModel";
interface Result {
    [key: string | number]: any;
}
export default class Collection extends BaseType {
    convertResult(result: Array<Result>, model: BaseModel): any[];
}
export {};
