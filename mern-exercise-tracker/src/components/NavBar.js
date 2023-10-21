import React from 'react'
import { Layout, Button, message } from 'antd';
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
export default function NavBar() {
  const navigate = useNavigate();
  const loggedUser = sessionStorage.getItem('username')
  const handleLogOut = () => {
    sessionStorage.removeItem('username');
    message.success("User logged out successfully!")
    navigate("/login")
  }
 
  return (
    <div>
       <Header
          style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          }}
       >
          <div className="demo-logo" />
          <h3 style={{color: "white"}}>Welcome to Fitness Tracker {loggedUser} !</h3>
          <Button style={{float: 'right'}} type="primary" onClick={handleLogOut}>Log Out</Button>
      </Header>
      
    </div>
  )
}
