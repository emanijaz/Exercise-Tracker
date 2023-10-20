import React, {useState} from 'react'
import { Layout, Button, message } from 'antd';
import { Navigate } from 'react-router-dom';
const { Header } = Layout;
export default function NavBar() {
  const [isLoggedOut, setIsLoggedOut]= useState(false);
  const loggedUser = sessionStorage.getItem('username')
  const handleLogOut = () => {
    sessionStorage.removeItem('username');
    setIsLoggedOut(true);
    message.success("User logged out successfully!")
  }
  if(isLoggedOut){
    return(
      <Navigate to="/login"></Navigate>
    )
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
