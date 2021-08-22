import React from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'

const { REACT_APP_API_KEY = '' } = process.env

const GoogleMapsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Wrapper apiKey={REACT_APP_API_KEY} libraries={['places']}>
    {children}
  </Wrapper>
)

export default GoogleMapsWrapper
