import EntityManager from "../src/EntityManager.js";
import {Author} from "./model/Author.js";
import Entity from "../src/types/Entity";
import Collection from "../src/types/Collection";

console.log('start')

window.em = new EntityManager()
window.em.setModel(new Author(), {
  find: new Entity((pk) => {
    return fetch(`http://localhost:8000/api/authors/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findByPk: new Entity((pk) => {
    return fetch(`http://localhost:8000/api/authors/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findAll: new Collection(() => {
    return fetch(`http://localhost:8000/api/authors`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  })
})
