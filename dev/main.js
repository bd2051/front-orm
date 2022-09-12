import Author from "./model/Author";
import Story from "./model/Story";
import { Collection, Entity, EntityManager } from "../src";
console.log('start');
const em = new EntityManager();
em.setModel(Author, {
    find: new Entity(em, (pk) => {
        return fetch(`http://localhost:8000/api/authors/${pk}`).then(response => response.json())
            .then((data) => {
            console.log(data);
            return data;
        });
    }),
    findByPk: new Entity(em, (pk) => {
        return fetch(`http://localhost:8000/api/authors/${pk}`).then(response => response.json())
            .then((data) => {
            console.log(data);
            return data;
        });
    }),
    findAll: new Collection(em, () => {
        return fetch(`http://localhost:8000/api/authors`).then(response => response.json())
            .then((data) => {
            console.log(data);
            return data;
        });
    })
});
em.setModel(Story, {
    find: new Entity(em, (pk) => {
        return fetch(`http://localhost:8000/api/stories/${pk}`).then(response => response.json())
            .then((data) => {
            console.log(data);
            return data;
        });
    }),
    findByPk: new Entity(em, (pk) => {
        return fetch(`http://localhost:8000/api/stories/${pk}`).then(response => response.json())
            .then((data) => {
            console.log(data);
            return data;
        });
    }),
    findAll: new Collection(em, () => {
        return fetch(`http://localhost:8000/api/stories`).then(response => response.json())
            .then((data) => {
            console.log(data);
            return data;
        });
    })
});
const apiNameMap = {
    Author: 'authors',
    Story: 'stories'
};
em.setHooks({
    preFlush(commits) {
        console.log(commits);
        return commits;
    },
    create(data, value) {
        return fetch(`http://localhost:8000/api/${apiNameMap[data.$getName()]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(value)
        }).then(response => response.json())
            .then((result) => {
            console.log(result);
            return result.id;
        });
    },
    update(data) {
        return fetch(`http://localhost:8000/api/${apiNameMap[data.$getName()]}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Object.assign({}, data))
        }).then(response => response.json())
            .then((result) => {
            console.log(result);
            return data['id'];
        });
    },
});
try {
    if (window) {
        window.em = em;
    }
}
catch (e) {
}
export default em;
