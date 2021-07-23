import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
// import { LoadingOutlined } from '@ant-design/icons'

import Login from '../pages/auth/login'
import Signup from '../pages/auth/signup'
import ResetPassword from '../pages/auth/reset-password'
// import Setting from '../pages/setting'

import { PublicRoute, PrivateRoute } from './route'
import ShipmentPage from '../pages/shipment/shipment'
import CreateShipmentPage from '../pages/shipment/create'
import BookingPage from '../pages/booking/booking'
import CreateBookingPage from '../pages/booking/create'
import PurchaseOrderPage from '../pages/purchase-order/purchase-order'
import CreatePurchaseOrderPage from '../pages/purchase-order/create'
import ContactPage from '../pages/contact/contact'
import CreateContactPage from '../pages/contact/create'

const AppRouter = () => {
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

        <PrivateRoute path='/booking'>
          <BookingPage />
        </PrivateRoute>

        <PrivateRoute path='/purchase-order/create'>
          <CreatePurchaseOrderPage />
        </PrivateRoute>

        <PrivateRoute path='/purchase-order'>
          <PurchaseOrderPage />
        </PrivateRoute>

        <PrivateRoute path='/contact/create'>
          <CreateContactPage />
        </PrivateRoute>

        <PrivateRoute path='/contact'>
          <ContactPage />
        </PrivateRoute>

        <PrivateRoute path='/shipment/create'>
          <CreateShipmentPage />
        </PrivateRoute>

        <PrivateRoute path='/'>
          <ShipmentPage />
        </PrivateRoute>

      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
