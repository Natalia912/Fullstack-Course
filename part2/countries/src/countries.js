import axios from "axios";

const BASE_URL = 'https://restcountries.com/v3.1/all'

const getCountries = axios.get(BASE_URL).then((res) => res.data)

export {getCountries};