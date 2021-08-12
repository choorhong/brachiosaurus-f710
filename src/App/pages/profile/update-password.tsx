import React from 'react'
import { Tabs } from 'antd'

import Nav from '../../layout/Nav'
import UpdatePassword from '../../components/profile/UpdatePassword'
import ProfileInfo from '../../components/profile/ProfileInfo'

const { TabPane } = Tabs

const PurchaseOrderPage: React.FC = () => {
  return (
    <Nav>
      <Tabs defaultActiveKey='profileInfo' type='card'>
        <TabPane tab='Profile Info' key='profileInfo'>
          <ProfileInfo />
        </TabPane>
        <TabPane tab='Update Passwrod' key='updatePassword'>
          <UpdatePassword />
        </TabPane>
      </Tabs>

    </Nav>
  )
}

export default PurchaseOrderPage
