import { useState } from 'react'
import {getWeather} from './weather'

const Country = ({name, capital, area, languages, flag, latlng}) => {

  const [weather, setWeather] = useState(null)

  const languagesArr = () => {
    const langArr = []
    for (let key in languages) {
      langArr.push(languages[key])
    }
    return langArr
  }

  getWeather(latlng[0], latlng[1]).then(data => setWeather(data))

  return ( 
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <ul>
        {languagesArr().map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={flag} alt={`${name} flag`} />
      <h2>Weather in {capital}</h2>
      {weather && (
        <div>
          <p>temperature {weather.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}  
    </div>
  );
}

export default Country;