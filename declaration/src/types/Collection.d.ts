import BaseType from "./BaseType";
import { Model } from "../types";
interface Result {
    [key: string | number]: any;
}
export default class Collection extends BaseType {
    convertResult(result: Array<Result>, model: Model): any[];
}
export {};
