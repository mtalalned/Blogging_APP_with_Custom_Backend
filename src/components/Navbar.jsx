import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  
  const [userCheck , setUserCheck] = useState(false)
  const navigate = useNavigate()
  const [userObj , setUserObj] = useState({})
  const [mainLoader , setMainLoader] = useState(true)


  const SignOutUser = async () => {

    try {
      const logout = await axios.post('http://localhost:3000/api/v1/logout')
      localStorage.removeItem('accessToken')
      navigate('/')
    } catch (error) {
      console.log (error)
    }

  }
  
  return (
    <div>
      <div className="navbar bg-[#7749f8]">
          <div className="">
            <Link to={'/'} className=" text-[1rem] text-white font-bold rounded min-[480px]:ms-[7.2%] hover:bg-[#ffffff] hover:text-[#7749f8] px-5 py-1">LOGIN</Link>
          </div>
          <div className="">
            <Link to={'signup'} className=" text-[1rem] text-white font-bold rounded min-[480px]:ms-[7.2%] hover:bg-[#ffffff] hover:text-[#7749f8] px-5 py-1">SIGNUP</Link>
          </div>
          <div className="">
            <Link to={'dashboard'} className=" text-[1rem] text-white font-bold rounded min-[480px]:ms-[7.2%] hover:bg-[#ffffff] hover:text-[#7749f8] px-5 py-1">HOME</Link>
          </div>
          <div className="">
            <button onClick={SignOutUser} to={''} className=" text-[1rem] text-white font-bold rounded min-[480px]:ms-[7.2%] hover:bg-[#ffffff] hover:text-[#7749f8] px-5 py-1">SIGNOUT</button>
          </div>
      </div>
    </div>
  )
}

export default Navbar
