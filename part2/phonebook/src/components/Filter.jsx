const Filter = ({search, handleSearch}) => {

  return (
    <p>
      filter shown with 
      <input type='text' value={search} onChange={(e) => handleSearch(e)} />
    </p>
  )
}

export default Filter;