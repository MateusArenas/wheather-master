import axios from 'axios'

const api = axios.create({
  // validateStatus: function () { return true; }
  baseURL: 'http://api.wasitt.com', // this is localhost (telenews)
  // baseURL: 'http://192.168.0.101:3000',
   // this is localhost
  headers: {
    'Access-Control-Allow-Origin': '*',
    Connection: 'keep-alive',
  }
})

export default api
