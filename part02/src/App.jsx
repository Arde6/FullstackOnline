import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Courses from './components/Courses'
import Name from './components/Name'
import peopleService from './services/people'
import Notification from './components/Notification'
import countryService from './services/countries'

/**
 * -------- Example ---------
 */

// const App = (props) => {  
//   const [notes, setNotes] = useState([])
//   const [newNote, setNewNote] = useState('')
//   const [showAll, setShowAll] = useState(true)
//
//   const hook = () => {
//     console.log('effect')
//     axios
//       .get('http://localhost:3001/notes')
//       .then(response => {
//         console.log('promise fulfilled')
//         setNotes(response.data)
//       })
//   }
//
//   useEffect(hook, [])
//
//   console.log('render', notes.length, 'notes')
//
//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       important: Math.random() > 0.5,
//       id: String(notes.length + 1),
//     }
//
//     setNotes(notes.concat(noteObject))
//     setNewNote('')
//   }
//
//   const handleNoteChange = (event) => {
//     setNewNote(event.target.value)
//   }
//
//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important === true)
//
//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input 
//           value={newNote} 
//           onChange={handleNoteChange}
//         />
//         <button type='submit'>save</button>
//       </form>
//     </div>
//   )
// }

/**
 * --------- Example ---------
 */

/**
 * --------- Part a ---------
 */

// const App = () => {
//   const courses = [
//     {
//       name: 'Half Stack application development',
//       id: 1,
//       parts: [
//         {
//           name: 'Fundamentals of React',
//           exercises: 10,
//           id: 1
//         },
//         {
//           name: 'Using props to pass data',
//           exercises: 7,
//           id: 2
//         },
//         {
//           name: 'State of a component',
//           exercises: 14,
//           id: 3
//         },
//         {
//           name: 'Redux',
//           exercises: 11,
//           id: 4
//         }
//       ]
//     }, 
//     {
//       name: 'Node.js',
//       id: 2,
//       parts: [
//         {
//           name: 'Routing',
//           exercises: 3,
//           id: 1
//         },
//         {
//           name: 'Middlewares',
//           exercises: 7,
//           id: 2
//         }
//       ]
//     }
//   ]

//   return (
//     <div>
//       <h1>Web development curriculum</h1>
//       <Courses courses={courses} />
//     </div>
//   )
// }

/**
 * --------- Part a ---------
 */

/**
 * --------- Part b ---------
 * --------- Part c ---------
 * --------- Part d ---------
 * --------- Part e ---------
 */

// const Filter = ({ text, filter, handleFilterChange }) => {

//   return (
//     <div>
//       <form>
//         {text}
//         <input
//           value={filter}
//           onChange={handleFilterChange}
//         />
//       </form>
//     </div>
//   )
// }

// const PersonForm = ({ addName, newName, handleNameChange, newNum, handleNumChange }) => {

//   return (
//     <form onSubmit={addName}>
//       <div>
//         name: 
//         <input 
//           value={newName}
//           onChange={handleNameChange}
//         />
//         <br/>
//         number:
//         <input 
//           value={newNum}
//           onChange={handleNumChange}
//         />
//         <br/>
//         <button type="submit">add</button>
//       </div>
//     </form>
//   )
// }

// const Persons = ({ persons, filter, deleteName }) => {

//   const namesToShow = persons.filter(person =>
//     person.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <ul>
//       {namesToShow.map(person => 
//         <Name key={person.name} person={person} deleteName={deleteName} />
//       )}
//     </ul>
//   )
// }

// const App = () => {

//   const [persons, setPersons] = useState([])
//   const [newName, setNewName] = useState('')
//   const [newNum, setNewNum] = useState('')
//   const [filter, setFilter] = useState('')

//   const [errorMessage, setErrorMessage] = useState(null)
//   const [infoMessage, setInfoMessage] = useState(null)

//   useEffect(() => {
//     peopleService
//       .getAll()
//       .then(response => {
//         setPersons(response.data)
//       })  
//   }, [])

//   const addName = (event) => {
//     event.preventDefault()
    
//     const errorMessage = `${newName} is already added to phonebook, replace the old number with a new one?`

//     const nameExists = persons.some(person => person.name === newName)

//     const nameObject = {
//       name: newName,
//       number: newNum,
//     }

//     if (nameExists) {
//       const personToUpdate = persons.find(person => person.name === newName)
//       const id = personToUpdate.id
//       if (window.confirm(errorMessage)) {
//         peopleService
//           .update(id, nameObject)
//           .then((returnedPerson) => {
//             setPersons(persons.map((person) => (person.id !== id ? person : returnedPerson)))
//             setInfoMessage(nameObject.name + ' modified succesfully')
//             setTimeout(() => {
//               setInfoMessage(null)
//             }, 5000)
//           })
//           .catch((error) => {
//             setErrorMessage(
//               'Person doesn\'t exist anymore'
//             )
//             setTimeout(() => {
//               setErrorMessage(null)
//             }, 5000)
//           })
//       }
//     } else if (newNum === '' || newName === ''){
//         setErrorMessage(
//           'Name or number is empty'
//         )
//         setTimeout(() => {
//           setErrorMessage(null)
//         }, 5000)
//     } else {
//         peopleService
//           .create(nameObject)
//           .then(response => {
//             setPersons(persons.concat(response.data))
//             setNewName('')
//             setNewNum('')
//             setInfoMessage(nameObject.name + ' added succesfully')
//             setTimeout(() => {
//               setInfoMessage(null)
//             }, 5000);
//           })
//     }
//   }

//   const deleteName = (id) => {
//     if (window.confirm('Delete ' + persons.find(person => person.id === id).name + '?')) {
//       peopleService
//         .deleteName(id)
//         .then(() => {
//           setPersons(persons.filter(person => person.id !== id));
//         })
//     }
//   }

//   const handleNameChange = (event) => {
//     setNewName(event.target.value)
//   }

//   const handleNumChange = (event) => {
//     setNewNum(event.target.value)
//   }

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value)
//   }

//   return (
//     <div>

//       <h1>Phonebook</h1>

//       <Notification message={errorMessage} type="error" />
//       <Notification message={infoMessage} type="info" />

//       <Filter text={"search: "} filter={filter} handleFilterChange={handleFilterChange} />

//       <h2>Add new</h2>

//       <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} />

//       <h2>Numbers</h2>

//       <Persons persons={persons} filter={filter} deleteName={deleteName} />

//     </div>
//   )
// }

/**
 * --------- Part b ---------
 */

/**
 * --------- Part e ---------
 */

const Filter = ({ text, filter, handleFilterChange }) => {

  return (
    <div>
      <form>
        {text}
        <input
          value={filter}
          onChange={handleFilterChange}
        />
      </form>
    </div>
  )
}

const AllCountries = ({ countriesToShow }) => {
  return (
    <ul>
      {countriesToShow.map(country => 
        <li key={country.name.common}>{country.name.common}</li>
      )}
    </ul>
  )
}

const App = () => {

  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })  
  }, [countries])

  if(countries === null) {
    return null
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  if (countriesToShow.lenght === 1) {
    return (
      <div>
        <Filter text={"search: "} filter={filter} handleFilterChange={handleFilterChange} />
      </div>
    )
  }

  return (
    <div>
      <Filter text={"search: "} filter={filter} handleFilterChange={handleFilterChange} />

      <AllCountries countriesToShow={countriesToShow} />
    </div>
  )
}

/**
 *   const namesToShow = country.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );
 * --------- Part e ---------
 */

export default App

