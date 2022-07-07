import Repository from "./repository.js";

export default class EntityManager {
  constructor() {
    this.models = {}
    this.storage = {}
    this.cache = {}
  }
  setModel(model, repositories) {
    this.storage[model.getName()] = {}
    this.models[model.getName()] = new Repository(this, model, repositories)
  }
}