const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://aj:${password}@cluster0.u7ezs0d.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


// --- For adding new entry ---
if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {

    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log('Added ' + name + ' number ' + number + ' to phonebook')
        mongoose.connection.close()
    })

} else {
    console.log('too many arguments')
    mongoose.connection.close()
}


// --- Multiple entries ---

// const persons = [
//   { name: "Arto Hellas", number: "040-123456" },
//   { name: "Ada Lovelace", number: "39-44-5323523" },
//   { name: "Dan Abramov", number: "12-43-234345" },
//   { name: "Mary Poppendieck", number: "39-23-6423122" }
// ]

// Person.insertMany(persons)
//   .then(() => {
//     console.log('All persons saved successfully!')
//     return mongoose.connection.close()
//   })
//   .catch(err => {
//     console.error('Error saving persons:', err)
//     mongoose.connection.close()
//   })

// --- Find all entries ---

