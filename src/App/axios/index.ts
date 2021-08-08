import axios from 'axios'
import { auth } from '../../firebase'

const axiosAuth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

axiosAuth.interceptors.request.use(
  async req => {
    req.headers.authorization = await auth.currentUser!.getIdToken()
    return req
  },
  err => Promise.reject(err)
)

export default axiosAuth
