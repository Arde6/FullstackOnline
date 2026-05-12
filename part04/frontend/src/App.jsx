import { useState, useEffect } from 'react'
import axios from 'axios'
import Name from './components/Name'
import peopleService from './services/people'
import Notification from './components/Notification'


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

const PersonForm = ({ addName, newName, handleNameChange, newNum, handleNumChange }) => {

  return (
    <form onSubmit={addName}>
      <div>
        name: 
        <input 
          value={newName}
          onChange={handleNameChange}
        />
        <br/>
        number:
        <input 
          value={newNum}
          onChange={handleNumChange}
        />
        <br/>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const People = ({ people, filter, deleteName }) => {

  const namesToShow = people.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {namesToShow.map(person => 
        <Name key={person.id} person={person} deleteName={deleteName} />
      )}
    </ul>
  )
}

const App = () => {

  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(data => {
        setPeople(data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    
    const confirmMessage = `${newName} is already added to phonebook, replace the old number with a new one?`

    const nameExists = people.some(person => person.name === newName)

    const nameObject = {
      name: newName,
      number: newNum,
    }

    if (nameExists) {
      const personToUpdate = people.find(person => person.name === newName)
      const id = personToUpdate.id
      if (window.confirm(confirmMessage)) {
        peopleService
          .update(id, nameObject)
          .then((returnedPerson) => {
            setPeople(people.map((person) => (person.id !== id ? person : returnedPerson)))
            setInfoMessage(nameObject.name + ' modified succesfully')
            setNewName('')
            setNewNum('')
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setErrorMessage(
              error.response.data.error
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else if (newNum === '' || newName === ''){
        setErrorMessage('Please provide both name and number')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    } else {
        peopleService
          .create(nameObject)
          .then(createdPerson => {
            setPeople(people.concat(createdPerson))
            setNewName('')
            setNewNum('')
            setInfoMessage(nameObject.name + ' added succesfully')
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              error.response.data.error
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    }
  }

  const deleteName = (id) => {
    if (window.confirm('Delete ' + people.find(person => person.id === id).name + '?')) {
      peopleService
        .deleteName(id)
        .then(() => {
          setPeople(people.filter(person => person.id !== id));
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>

      <h1>Phonebook</h1>

      <Notification message={errorMessage} type="error" />
      <Notification message={infoMessage} type="info" />

      <Filter text={"search: "} filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add new</h2>

      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} />

      <h2>Numbers</h2>

      <People people={people} filter={filter} deleteName={deleteName} />

    </div>
  )
}

export default App

