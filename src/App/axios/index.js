import axios from 'axios'

const axiosAuth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

export default axiosAuth
