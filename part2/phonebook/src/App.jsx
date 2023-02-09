import { useState, useEffect } from 'react'

import notesServices from './services/notes'

import PersonForm from './components/personForm'
import NumbersList from './components/NumbersList'
import Filter from './components/Filter'
import './App.css'


function App() {
 const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })

  const [search, setSearch] = useState('')


  useEffect(() => {
    notesServices
    .getAllNotes()
    .then(data =>setPersons(data))
  }, [])

   const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const confirmMessage = `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
    if (persons.some(person => person.name === newPerson.name)) {
      if (window.confirm(confirmMessage)) {
        const person = persons.find(person => person.name === newPerson.name)
        notesServices
          .updateNote(person.id, {...person, number: newPerson.number})
          .then(newPerson => {
            setPersons(
              prev => prev.map(prevPerson => prevPerson.name === newPerson.name ? newPerson : prevPerson)
            )
          })
          
      }
      
    } else {
      notesServices
        .addNote(newPerson)
        .then(data => setPersons(prev => [...prev, data]))
    }

    setNewPerson({
        name: '',
        number: ''
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm newPerson={newPerson} setNewPerson={setNewPerson} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <NumbersList persons={persons} search={search} setPersons={setPersons} />
    </div>
  )
}

export default App
