import notesServices from '../services/notes'

const NumbersList = ({persons, search, setPersons}) => {

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      notesServices.deleteNote(id)
        .then(
          () => {
            const updatedList = persons.filter(p => p.id !== id)
            setPersons(updatedList)
          }
        )
        .catch(
          () => {
            alert('the item does not exist')
          }
        )
    }
  }

  return ( 
    <ul>
      {
        persons
        .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        .map(person => (
        <li key={person.id}>
          <p>{person.name} - {person.number}</p>
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </li>))
      }
    </ul>
   );
}

export default NumbersList;