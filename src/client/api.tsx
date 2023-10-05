import axios from 'axios'

export const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/'

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
})

export default API
