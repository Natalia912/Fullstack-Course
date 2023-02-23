const express = require('express')

const app = express()

app.use(express.json())

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
  const note = request.body

  const newId = Math.ceil(Math.random()*10000)
  response.json(note)

  persons = persons.concat({...note, id: newId})
})


app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${len} people</p>${new Date()}<p></p>`)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})