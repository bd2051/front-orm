export default class BaseField {
    constructor(em) {
        this.em = em;
    }
    // convert(data: any, key: string): any { // TODO remove?
    //   return data[key]
    // }
    // validate(value: any): boolean { // TODO remove?
    //   return !(typeof value === 'undefined')
    // }
    view(value) {
        return value;
    }
    link(value) {
        return value;
    }
}
