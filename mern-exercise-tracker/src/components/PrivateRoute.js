import React from 'react'
import { Navigate } from 'react-router-dom';
const isLoggedIn = sessionStorage.getItem('username') ? true : false;

console.log("is logged in",isLoggedIn)
const PrivateRoute = ({children})=> {
    if(!isLoggedIn) {
       return <Navigate to="/login" replace />
    }
    return children;
};

export default PrivateRoute;