import Author from "./model/Author";
import Story from "./model/Story";
import {Collection, Entity, EntityManager} from "../src";

console.log('start')

declare global {
    interface Window {
        em: EntityManager;
    }
}

window.em = new EntityManager()
window.em.setModel(new Author(window.em), {
  find: new Entity(window.em,(pk: number) => {
    return fetch(`http://localhost:8000/api/authors/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findByPk: new Entity(window.em, (pk: number) => {
    return fetch(`http://localhost:8000/api/authors/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findAll: new Collection(window.em, () => {
    return fetch(`http://localhost:8000/api/authors`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  })
})
window.em.setModel(new Story(window.em), {
  find: new Entity(window.em, (pk: number) => {
    return fetch(`http://localhost:8000/api/stories/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findByPk: new Entity(window.em, (pk: number) => {
    return fetch(`http://localhost:8000/api/stories/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findAll: new Collection(window.em, () => {
    return fetch(`http://localhost:8000/api/stories`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  })
})
