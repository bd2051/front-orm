import Author from "./model/Author";
import Story from "./model/Story";
import {Collection, Entity, EntityManager} from "../src";
import {ModelData} from "../src/types";

console.log('start')

declare global {
    interface Window {
        em: EntityManager;
    }
}

const em = new EntityManager()

const serializeData = (data: ModelData) => {
  const q =  Object.entries(data).reduce((acc: any, [key, value]) => {
    if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined') {
      acc[key] = value
      return acc
    }
    if (Array.isArray(value)) {
      acc[key] = value.map(el => el.id)
      return acc
    }
    acc[key] = (value as ModelData)['id']
    return acc
  }, {})
  console.log('data2', JSON.stringify(q))
  return q
}

em.setModel(Author, {
  find: new Entity(em,(pk: number) => {
    return fetch(`http://localhost:8000/api/authors/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findByPk: new Entity(em, (pk: number) => {
    return fetch(`http://localhost:8000/api/authors/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findAll: new Collection(em, () => {
    return fetch(`http://localhost:8000/api/authors`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  })
})
em.setModel(Story, {
  find: new Entity(em, (pk: number) => {
    return fetch(`http://localhost:8000/api/stories/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findByPk: new Entity(em, (pk: number) => {
    return fetch(`http://localhost:8000/api/stories/${pk}`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  }),
  findAll: new Collection(em, () => {
    return fetch(`http://localhost:8000/api/stories`).then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  })
})

const apiNameMap = {
  Author: 'authors',
  Story: 'stories'
}

em.setHooks({
  preFlush(commits) {
    console.log(commits)
    return commits
  },
  get(data, pk: number | string) {
    return fetch(`http://localhost:8000/api/${apiNameMap[data.$getName() as 'Author' | 'Story']}/${pk}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
  },
  create(data, value) {
    return fetch(
      `http://localhost:8000/api/${apiNameMap[data.$getName() as 'Author' | 'Story']}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(serializeData(value))
      }
    ).then(response => response.json())
    .then((result) => {
      console.log('result', result)
      return result.id as number | string
    })
  },
  update(data) {
    return fetch(
      `http://localhost:8000/api/${apiNameMap[data.$getName() as 'Author' | 'Story']}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(serializeData({...data}))
      }
    ).then(response => response.json())
    .then((result) => {
      console.log(result)
      return data['id'] as number | string
    })
  },
  delete(data, pk) {
    return fetch(
      `http://localhost:8000/api/${apiNameMap[data.$getName() as 'Author' | 'Story']}/${pk}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(serializeData({...data}))
      }
    ).then(response => response.json())
    .then((result) => {
      console.log(result)
      return pk
    })
  },
})

try {
  if (window) {
    window.em = em
  }
} catch (e) {

}

export default em
