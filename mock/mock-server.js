const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
app.use(cors());

const stories = {
  1: {
    id: 1,
    name: 'Excellent story',
    author: 10
  },
  2: {
    id: 2,
    name: 'Simple story',
    author: 12
  },
  3: {
    id: 3,
    name: 'Boring story',
    author: 10
  },
  4: {
    id: 4,
    name: 'Good story',
    author: null
  },
  5: {
    id: 5,
    name: 'Usual story',
    author: null
  },
  6: {
    id: 6,
    name: 'Great story',
    author: 12
  }
}

const authors = {
  10: {
    id: 10,
    name: 'John Doe',
    age: 30,
    stories: [
      1, 3
    ]
  },
  12: {
    id: 12,
    name: 'Jane Doe',
    age: 29,
    stories: [
      2, 6
    ]
  }
}

app.get('/api/authors', (req, res) => {
  res.json(Object.values(authors))
})

app.get('/api/authors/:id', (req, res) => {
  res.json(authors[req.params.id])
})

app.get('/api/stories', (req, res) => {
  res.json(Object.values(stories))
})

app.get('/api/stories/:id', (req, res) => {
  res.json(stories[req.params.id])
})

app.listen(port, () => {
  console.log(`Mock server listening on port ${port}`)
})
