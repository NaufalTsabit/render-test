//const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note.js')

app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then( note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.filter(note => note.id === id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(404).json({
      error: 'content missing'
    })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
//const app = http.createServer((request, response) => {
//  response.writeHead(200, {"content-type": 'application/json'})
//  response.end(JSON.stringify(notes))
//})

const PORT = process.env.PORT
app.listen(PORT)

console.log(`server running on port ${PORT}`)