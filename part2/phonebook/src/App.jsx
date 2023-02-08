import { useState } from 'react'
import './App.css'

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
      <p>filter shown with <input type='text' value={search} onChange={(e) => handleSearch(e)} /></p>
      <form>
        <div>
          name: <input type='text' value={newPerson.name} onChange={(e) => setNewPerson(prev => ({...prev, name: e.target.value}))} />
        </div>
        <div>
          number: <input type='tel' value={newPerson.phone} onChange={(e) => setNewPerson(prev => ({...prev, phone: e.target.value}))} />
        </div>
        <div>
          <button type="submit" onClick={(e) => handleSubmit(e)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
        persons
        .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        .map(person => <li key={person.id}>{person.name} - {person.phone}</li>)
        }
      </ul>
    </div>
  )
}

export default App
