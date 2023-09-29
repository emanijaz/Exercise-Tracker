import React from 'react'
import { Layout } from 'antd';
const { Header } = Layout;
export default function NavBar() {
  return (
    <div>
       <Header
                style={{
                display: 'flex',
                alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <h3 style={{color: "white", alignContent: "center"}}>Welcome to Fitness Tracker!</h3>
      </Header>
    </div>
  )
}
