//const http = require('http')
const express = require('express')
const app = express()

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true  
  },  
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false  
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true  
  },
  {
    id: "4",
    content: "Test",
    important: false
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
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
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  notes = notes.concat(note)

  response.json(note)
})
//const app = http.createServer((request, response) => {
//  response.writeHead(200, {"content-type": 'application/json'})
//  response.end(JSON.stringify(notes))
//})

const PORT = process.env.PORT || 3001
app.listen(PORT)

console.log(`server running on port ${PORT}`)