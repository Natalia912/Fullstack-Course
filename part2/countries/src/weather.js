import axios from "axios";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

const apiKey = import.meta.env.VITE_APP_API_KEY

const getWeather = async (lat, lon) => {
  let url = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  return await axios.get(url).then(res => res.data)
}

export {getWeather};