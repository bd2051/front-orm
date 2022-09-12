const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const port = 8000
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

let storyLastId = 6

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

app.delete('/api/stories/:id', (req, res) => {
  delete stories[req.params.id]
  res.json({success: true})
})

app.post('/api/stories', (req, res) => {
  storyLastId += 1
  stories[storyLastId] = {
    id: storyLastId,
    ...req.body
  }
  if (req.body.author !== null) {
    stories[storyLastId].author = req.body.author.id
  }
  res.json({
    success: true,
    id: storyLastId
  })
})

app.put('/api/stories', (req, res) => {
  stories[req.body.id] = req.body
  if (req.body.author !== null) {
    stories[req.body.id].author = req.body.author.id
  }
  res.json({success: true})
})

app.put('/api/authors', (req, res) => {
  authors[req.body.id] = req.body
  if ( req.body.stories.length > 0) {
    authors[req.body.id].stories = req.body.stories.map(el => el.id)
  }
  res.json({success: true})
})

app.listen(port, () => {
  console.log(`Mock server listening on port ${port}`)
})
