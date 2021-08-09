import React, { useEffect } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
// import { LoadingOutlined } from '@ant-design/icons'

import Login from '../pages/auth/login'
import Signup from '../pages/auth/signup'
import ResetPassword from '../pages/auth/reset-password'
// import Setting from '../pages/setting'

import { PublicRoute, PrivateRoute } from './route'
import ShipmentPage from '../pages/shipment/shipment'
import ViewShipmentPage from '../pages/shipment/view'

import CreateShipmentPage from '../pages/shipment/create'

import BookingPage from '../pages/booking/booking'
import ViewBookingPage from '../pages/booking/view'
import CreateBookingPage from '../pages/booking/create'

import PurchaseOrderPage from '../pages/purchase-order/purchase-order'
import ViewPurchaseOrderPage from '../pages/purchase-order/view'
import CreatePurchaseOrderPage from '../pages/purchase-order/create'

import ContactPage from '../pages/contact/contact'
import ViewContactPage from '../pages/contact/view'
import CreateContactPage from '../pages/contact/create'

import VesselPage from '../pages/vessel/vessel'
import ViewVesselPage from '../pages/vessel/view'
import CreateVesselPage from '../pages/vessel/create'

import axiosAuth from '../axios'
import { useAuth } from '../hooks/auth-context'

const AppRouter = () => {
  const { token } = useAuth()
  useEffect(() => {
    const reqInterceptor = axiosAuth.interceptors.request.use(
      async req => {
        req.headers.authorization = token
        return req
      },
      err => Promise.reject(err)
    )
    return () => {
      axiosAuth.interceptors.request.eject(reqInterceptor)
    }
  }, [token])

  return (
    <BrowserRouter>
      <Switch>

        <PublicRoute path='/auth/login'>
          <Login />
        </PublicRoute>

        <PublicRoute path='/auth/signup'>
          <Signup />
        </PublicRoute>

        <PublicRoute path='/auth/reset-password'>
          <ResetPassword />
        </PublicRoute>

        <PrivateRoute path='/booking/create'>
          <CreateBookingPage />
        </PrivateRoute>

        <PrivateRoute path='/booking/:id'>
          <ViewBookingPage />
        </PrivateRoute>

        <PrivateRoute path='/booking'>
          <BookingPage />
        </PrivateRoute>

        <PrivateRoute path='/purchase-order/create'>
          <CreatePurchaseOrderPage />
        </PrivateRoute>

        <PrivateRoute path='/purchase-order/:id'>
          <ViewPurchaseOrderPage />
        </PrivateRoute>

        <PrivateRoute path='/purchase-order'>
          <PurchaseOrderPage />
        </PrivateRoute>

        <PrivateRoute path='/contact/create'>
          <CreateContactPage />
        </PrivateRoute>

        <PrivateRoute path='/contact/:id'>
          <ViewContactPage />
        </PrivateRoute>

        <PrivateRoute path='/contact'>
          <ContactPage />
        </PrivateRoute>

        <PrivateRoute path='/vessel/create'>
          <CreateVesselPage />
        </PrivateRoute>

        <PrivateRoute path='/vessel/:id'>
          <ViewVesselPage />
        </PrivateRoute>

        <PrivateRoute path='/vessel'>
          <VesselPage />
        </PrivateRoute>

        <PrivateRoute path='/shipment/create'>
          <CreateShipmentPage />
        </PrivateRoute>

        <PrivateRoute path='/shipment/:id'>
          <ViewShipmentPage />
        </PrivateRoute>

        <PrivateRoute path='/'>
          <ShipmentPage />
        </PrivateRoute>

      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
