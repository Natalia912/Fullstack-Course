require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

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


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else response.status(404).end()
  }).catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndRemove(request.params.id)
  .then(
    result => {
      response.status(204).end()
    })
  .catch(error => next(error))
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

  const newPerson = new Person({
    name: person.name,
    number: person.number
  })

  newPerson.save().then(savedPerson => response.json(savedPerson))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updated => {
      response.json(updated)
    })
    .catch(error => next(error))
})

let count = Person.countDocuments({})

app.get('/info', (request, response) => {

  Person.countDocuments().then(result => {
    response.send(`<p>Phonebook has info for ${result} people</p>${new Date()}<p></p>`)
});
  // response.send(`<p>Phonebook has info for ${count} people</p>${new Date()}<p></p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)