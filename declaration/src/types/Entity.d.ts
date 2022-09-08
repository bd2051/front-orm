import BaseType from "./BaseType";
import { Model } from "../types";
interface Result {
    [key: string | number]: any;
}
export default class Entity extends BaseType {
    convertResult(result: Result, model: Model): any;
}
export {};
