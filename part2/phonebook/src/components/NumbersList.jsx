const NumbersList = ({persons, search}) => {
  return ( 
    <ul>
      {
      persons
      .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      .map(person => <li key={person.id}>{person.name} - {person.number}</li>)
      }
    </ul>
   );
}

export default NumbersList;