import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

function getUserData () {
  const url = `${BASE_URL}/api/users`
  return axios.get(url).then(response => response.data)
}

export default getUserData
