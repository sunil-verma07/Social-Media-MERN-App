import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'

const ProtectedRoute = ({isAuthenticated,children}) => {
     const navigate = useNavigate();

        if(isAuthenticated === false){
            return navigate('/login');
        }

          
  return children ? children : <Outlet/>
   
}

export default ProtectedRoute