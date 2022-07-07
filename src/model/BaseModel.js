export default class BaseModel {
  constructor() {
  }
  getPk() {
    return 'id'
  }
  getName() {
    return this.constructor.name
  }
}