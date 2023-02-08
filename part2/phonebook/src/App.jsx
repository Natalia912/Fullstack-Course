import { useState } from 'react'

import Filter from './components/Filter'
import './App.css'
import PersonForm from './components/personForm'
import NumbersList from './components/NumbersList'

function App() {
 const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    phone: ''
  })

  const [search, setSearch] = useState('')

   const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
      
    } else setPersons(prev => [...prev, {...newPerson, id: prev.length + 1}])

    setNewPerson({
        name: '',
        phone: ''
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm newPerson={newPerson} setNewPerson={setNewPerson} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <NumbersList persons={persons} search={search} />
    </div>
  )
}

export default App
