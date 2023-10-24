import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({children})=> {
  const navigate = useNavigate();

    useEffect(()=> {
        const username = sessionStorage.getItem('username');
        const isLoggedIn = !!username;
        if(!isLoggedIn) {
            navigate("/login")
        }

    },[navigate])
    
    return children;
};

export default PrivateRoute;