import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
// import { LoadingOutlined } from '@ant-design/icons'

import Login from '../pages/auth/login'
import Signup from '../pages/auth/signup'
import ResetPassword from '../pages/auth/reset-password'
// import Setting from '../pages/setting'

import { PublicRoute, PrivateRoute } from './route'
import ShipmentPage from '../pages/shipment'
import ShipmentFormPage from '../pages/shipment-form'
import BookingPage from '../pages/booking'
import BookingFormPage from '../pages/booking-form'
import PurchaseOrderPage from '../pages/purchase-order'
import PurchaseOrderFormPage from '../pages/purchase-order-form'
import ContactPage from '../pages/contact'
import ContactFormPage from '../pages/contact-form'

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
          <BookingFormPage />
        </PrivateRoute>

        <PrivateRoute path='/booking'>
          <BookingPage />
        </PrivateRoute>

        <PrivateRoute path='/purchase-order/create'>
          <PurchaseOrderFormPage />
        </PrivateRoute>

        <PrivateRoute path='/purchase-order'>
          <PurchaseOrderPage />
        </PrivateRoute>

        <PrivateRoute path='/contact/create'>
          <ContactFormPage />
        </PrivateRoute>

        <PrivateRoute path='/contact'>
          <ContactPage />
        </PrivateRoute>

        <PrivateRoute path='/shipment/create'>
          <ShipmentFormPage />
        </PrivateRoute>

        <PrivateRoute path='/'>
          <ShipmentPage />
        </PrivateRoute>

      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
