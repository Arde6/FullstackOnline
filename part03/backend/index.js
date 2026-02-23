require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const Person = require('./models/person')
const app = express()

// const password = process.argv[2]
// const url = `mongodb+srv://aj:${password}@cluster0.u7ezs0d.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

// const Person = mongoose.model('Person', personSchema)

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ''
})

app.use(morgan(':method :url :status :res[content-lenght] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = body.name
      person.number = body.number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      let amount = persons.length
      const date = new Date()
      if (amount !== 1) {
        response.send(
          '<p> Phonebook has info for ' + amount + ' people </p>' +
                    '<p>' + date + '</p>'
        )
      } else {
        response.send(
          '<p> Phonebook has info for ' + amount + ' person </p>'
        )
      }
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})