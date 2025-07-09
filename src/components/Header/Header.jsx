import React, { useEffect } from 'react'
import "./Styles.css"
import { auth } from '../../firebase';
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate=useNavigate();
  useEffect(()=>{
      if(user){
         navigate("/dashboard");
      }
  }, [user, loading])
  const handleLogout=()=>{
    
    signOut(auth).then(() => {
       toast.success("Logged out Successfully!");
       navigate("/")
    }).catch((error) => {
      // An error happened.
      toast.error(error.message);
    });
    
  }
  return (
    <div className='navBar'>
       <p className='logo'>Money Nest</p>
       {user && <p className="logo link" onClick={handleLogout}>Logout</p>}
       
    </div>
  )
}

export default Header
