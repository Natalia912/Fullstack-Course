import { useEffect, useState } from 'react'
import {getCountries} from './countries'
import Country from './Country'
import './App.css'

function App() {

  const [data, setData] = useState(null)
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(null)

  useEffect(() => {
    getCountries.
      then(data => setData(data))
  }, [])

  const countriesList = data?.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  const showCountry = (name) => {
    let country = [...countriesList].find(c => c.name.common === name)
    setShow(country)
  }

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
            latlng={countriesList[0].capitalInfo.latlng}
          /> :
          countriesList?.map(country => (
            <li key={country.name.common}>
              <span>{country.name.common}</span>
              <button onClick={() => showCountry(country.name.common)}>show</button>
            </li>))
      }

      {show && 
        (<Country 
          name={show.name.common}
          capital={show.capital[0]} 
          area={show.area}
          languages={show.languages} 
          flag={show.flags.png}
          latlng={show.capitalInfo.latlng}
        />)
      }
      
    </div>
  )
}

export default App
