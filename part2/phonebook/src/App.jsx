import { useState } from 'react'
import './App.css'

function App() {
 const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    phone: null
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
      
    } else setPersons(prev => [...prev, newPerson])

    setNewPerson({
        name: '',
        phone: null
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => <li key={person.name}>{person.name} - {person.phone}</li>)}
      </ul>
    </div>
  )
}

export default App
