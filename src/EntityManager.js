import Repository from "./Repository.js";

export default class EntityManager {
  constructor() {
    this.models = {}
    this.repositories = {}
    this.storage = {}
    this.cache = {}
  }
  setModel(model, repositories) {
    model.setEntityManager(this)
    this.storage[model.getName()] = {}
    this.models[model.getName()] = model
    this.repositories[model.getName()] = new Repository(this, model, repositories)
  }
}