const express = require('express')
const app = express()
const port = 3000

const stories = {
  1: {
    name: 'Excellent story'
  },
  2: {
    name: 'Simple story'
  },
  3: {
    name: 'Boring story'
  },
  4: {
    name: 'Good story'
  },
  5: {
    name: 'Usual story'
  },
  6: {
    name: 'Great story'
  }
}

const authors = {
  10: {
    name: 'John Doe',
    stories: [
      1, 3
    ]
  },
  12: {
    name: 'Jane Doe',
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
