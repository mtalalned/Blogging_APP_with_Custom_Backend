import React, { useRef, useState } from 'react'
import axios from 'axios'


const Signup = () => {
  
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const [loader , setLoader] = useState(false)
  const [regisSuccess , setRegisSuccess] = useState(false)
  const [error , setError] = useState(false)
  const [elseError , setElseError] = useState(false)
  const [incorrectEmail , setIncorrectEmail] = useState (false)
  const [passError , setPassError] = useState(false)

  const signUpUser = async (event) => {
    
    // prevent Default
    event.preventDefault()

    try {
      
      const register = await axios.post('http://localhost:3000/api/v1/register' , {email: email.current.value , password: password.current.value , username: username.current.value})

      email.current.value = ''
      password.current.value = ''
      username.current.value = ''

    } catch (error) {
      console.log (error)
    }

  }
  
  
  return (
    <div>
      <h1 className='text-2xl text-center m-4 text-start ms-[8%] font-bold'>Signup</h1>
      <div className='bg-[#f8f9fa] flex justify-center items-center min-h-[80vh]'>
        <form onSubmit={(event)=>signUpUser(event)} className='flex flex-col gap-3 py-5 justify-center items-center bg-[#ffffff] w-[40%] min-w-[300px] min-h-[40vh] rounded-lg shadow-lg'>
          <input type="text" placeholder="Username" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={username} required minLength={3}/>
          <input type="text" placeholder="Email" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={email} required/>
          <input type="password" placeholder="Password" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={password} required pattern=".*" minLength={8}/>
          <button type='submit' className="bg-[#7749f8] text-white rounded-lg p-3">{loader ? <span className="loading loading-spinner loading-md"></span> : 'Signup'}</button>
        </form>
      </div>
      
      
      
      
      {regisSuccess && <div role="alert" className="alert alert-success w-[300px] fixed bottom-3 left-[37vw]">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current text-white"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span className='text-white'>Registration Successfull !!</span>
  <button
            onClick={closeAlert}
            className="text-white hover:bg-transparent hover:text-gray-800"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
</div>}





{error && <div role="alert" className="alert alert-error w-[300px] fixed bottom-3 left-[37vw]">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current text-white"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span className='text-white'>Email already in use !!</span>
  <button
            onClick={closeAlert}
            className="text-white hover:bg-transparent hover:text-gray-800"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
</div>}




{elseError && <div role="alert" className="alert alert-error w-[300px] fixed bottom-3 left-[37vw]">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current text-white"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span className='text-white'>Failed to register email !!</span>
  <button
            onClick={closeAlert}
            className="text-white hover:bg-transparent hover:text-gray-800"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
</div>}



{incorrectEmail && <div role="alert" className="alert alert-error w-[300px] fixed bottom-3 left-[37vw]">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current text-white"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span className='text-white'>Incorrect email !!</span>
  <button
            onClick={closeAlert}
            className="text-white hover:bg-transparent hover:text-gray-800"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
</div>}


{passError && <div role="alert" className="alert alert-error w-[300px] fixed bottom-3 left-[37vw]">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current text-white"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span className='text-white'>Password Mismatch !!</span>
  <button
            onClick={closeAlert}
            className="text-white hover:bg-transparent hover:text-gray-800"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
</div>}



  </div>
  )
}

export default Signup
