import { useEffect, useState } from 'react'
import {getCountries} from './countries'
import Country from './Country'
import './App.css'

function App() {

  const [data, setData] = useState(null)

  console.log(data)

  const [search, setSearch] = useState('')

  useEffect(() => {
    getCountries.
      then(data => setData(data))
  }, [])

  const countriesList = data?.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="App">
      <div>
        <p>find countries</p>
        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {
        countriesList?.length > 10 ? 
          <p>Too many matches, specify another filter</p> : 
          countriesList?.length === 1 ?
          <Country 
            name={countriesList[0].name.common}
            capital={countriesList[0].capital[0]} 
            area={countriesList[0].area}
            languages={countriesList[0].languages} 
            flag={countriesList[0].flags.png}
          /> :
          countriesList?.map(country => <li key={country.name.common}>{country.name.common}</li>)
      } 
      
    </div>
  )
}

export default App
