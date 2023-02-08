import { useState, useEffect } from 'react'
import axios from 'axios'


import Filter from './components/Filter'
import './App.css'
import PersonForm from './components/personForm'
import NumbersList from './components/NumbersList'

function App() {
 const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })

  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(res =>setPersons(res.data))
  }, [])

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
        number: ''
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
