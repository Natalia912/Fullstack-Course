const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

let newName = process.argv[3]
let newNumber = process.argv[4]

const url =
  `mongodb+srv://tretiakowa2212:${password}@cluster0.racz2ff.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber,
})

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => { console.log(`${person.name} ${person.number}`)})
    mongoose.connection.close()
  })
}

if (process.argv.length > 3 && process.argv.length < 6) {
  person.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}

