export default interface FieldInterface {
    validate(value: any): boolean
    convert(value: any): any
}