const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

morgan.token('body-content', function getBody (req) { return JSON.stringify(req.body) })

app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body-content'
, {
  skip: function (req, res) { return req.method !== 'POST' }
}))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const len = persons.length

app.get('/api/persons', (request, response) => response.send(persons))

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const person = persons.find(person => person.id === id)

  if (!person) response.status(404).end()

  response.send(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  if (!person.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }

  if (!person.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  if (persons.find(p => p.name === person.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const newId = Math.ceil(Math.random()*10000)
  response.json(person)

  persons = persons.concat({...person, id: newId})
})


app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${len} people</p>${new Date()}<p></p>`)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})