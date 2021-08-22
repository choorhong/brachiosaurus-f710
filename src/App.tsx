import React from 'react'
import './App.css'
import AuthContextProvider from './App/hooks/auth-context'
import AppRouter from './App/routes'
import GoogleMapsWrapper from './googleMapsWrapper'

const App: React.FC = () => {
  return (
    <GoogleMapsWrapper>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </GoogleMapsWrapper>
  )
}

export default App
