import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const username = sessionStorage.getItem('username');
const isLoggedIn = !!username;

const PrivateRoute = ({children})=> {
  const navigate = useNavigate();

    useEffect(()=> {
        if(!isLoggedIn) {
            navigate("/login")
        }

    },[navigate])
    
    return children;
};

export default PrivateRoute;