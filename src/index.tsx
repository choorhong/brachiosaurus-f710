import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css'
import App from './App'
import { auth } from './firebase'
import reportWebVitals from './reportWebVitals'

axios.interceptors.request.use(
  async req => {
    req.headers.authorization = await auth.currentUser!.getIdToken()
    return req
  },
  err => Promise.reject(err)
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
