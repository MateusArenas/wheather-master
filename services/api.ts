import axios from 'axios'

const api = axios.create({
  baseURL: 'https://community-open-weather-map.p.rapidapi.com', // this is localhost (telenews)
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // Connection: 'keep-alive',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': '150832c484mshee5c13874a5f738p1c338bjsnda02d18b10a1'
  }
})

export default api
