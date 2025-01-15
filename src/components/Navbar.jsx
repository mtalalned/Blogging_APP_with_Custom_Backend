import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../Configs/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { query, where, getDocs , orderBy} from "firebase/firestore";
import { db } from '../Configs/firebaseconfig';
import { collection } from 'firebase/firestore';

const Navbar = () => {
  
  const [userCheck , setUserCheck] = useState(false)
  const navigate = useNavigate()
  const [userObj , setUserObj] = useState({})
  const [mainLoader , setMainLoader] = useState(true)


    
    const getDatafromFirestore = async () => {
      
      setMainLoader(true)

      try {
        const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => { 
          setUserObj({...doc.data()})
        }); 
      }
      catch (error ){
        console.log (error + 'unable to get data from firestore')
      }
      finally {
        setMainLoader(false)
      }
    }
  
  
  useEffect(()=>{
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getDatafromFirestore();
        // ...
      setUserCheck (false)
    } else {
      setUserCheck (true)
  }
  });

  } , [])

  const SignOutUser = ()=> {

    signOut(auth).then(() => {
     // Sign-out successful.
     navigate ('/')
    }).catch((error) => {
      // An error happened.
    });
  }
  
  return (
    <div>
      <div className="navbar bg-[#7749f8]">
          <div className="flex-1">
            <Link to={'dashboard'} className=" text-[1rem] text-white font-bold rounded min-[480px]:ms-[7.2%] hover:bg-[#ffffff] hover:text-[#7749f8] px-5 py-1">Personal Blogging App</Link>
          </div>
          <div className="flex-1">
            <Link to={'dashboard'} className=" text-[1rem] text-white font-bold rounded min-[480px]:ms-[7.2%] hover:bg-[#ffffff] hover:text-[#7749f8] px-5 py-1">Personal Blogging App</Link>
          </div>
          <div className="flex-1">
            <Link to={'dashboard'} className=" text-[1rem] text-white font-bold rounded min-[480px]:ms-[7.2%] hover:bg-[#ffffff] hover:text-[#7749f8] px-5 py-1">Personal Blogging App</Link>
          </div>
      </div>
    </div>
  )
}

export default Navbar
