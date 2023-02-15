import { useEffect, useState } from 'react'
import {getCountries} from './countries'
import './App.css'

function App() {

  const [data, setData] = useState(null)

  console.log(data)

  const [search, setSearch] = useState('')

  useEffect(() => {
    getCountries.
      then(data => setData(data))
  }, [])

  const countriesList = data?.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())).map(country => <li key={country.name.common}>{country.name.common}</li>)

  return (
    <div className="App">
      <div>
        <p>find countries</p>
        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {data && data.length > 10 ? <p>Too many matches, specify another filter</p> : countriesList}
      
    </div>
  )
}

export default App
