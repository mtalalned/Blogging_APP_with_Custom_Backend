import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ProtectedRoutes = ({component}) => {
  
    const navigate = useNavigate()

    useEffect (()=>{
      
      const CheckFunction = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')

            if (!accessToken) return navigate('/')

            const protectedRoute = await axios.get ('http://localhost:3000/api/v1/userdata' , 
                {
                    headers: {
                    'Authorization': accessToken, 
                    'Content-Type': 'application/json'
                    },
                }
            )
            console.log (protectedRoute)
            if (protectedRoute.data.message === 'you are getting all user detail') {
                return
            }
        } catch (error) {
            navigate('/')
        }
    }

    CheckFunction()
    } , [])
    

    return (
        <>
        {component}
        </>
  )
}

export default ProtectedRoutes