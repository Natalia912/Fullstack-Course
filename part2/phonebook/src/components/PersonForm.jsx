const PersonForm = ({
  newPerson,
  setNewPerson,
  handleSubmit,
}) => {
  return ( 
    <form>
      <div>
        name: <input type='text' value={newPerson.name} onChange={(e) => setNewPerson(prev => ({...prev, name: e.target.value}))} />
      </div>
      <div>
        number: <input type='tel' value={newPerson.number} onChange={(e) => setNewPerson(prev => ({...prev, number: e.target.value}))} />
      </div>
      <div>
        <button type="submit" onClick={(e) => handleSubmit(e)}>add</button>
      </div>
    </form> 
  );
}

export default PersonForm;