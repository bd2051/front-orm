export default interface FieldInterface {
    validate(value: any): boolean;
    convert(data: any, key: string): any;
}
