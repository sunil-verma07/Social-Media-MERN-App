import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import "./login.css";
import authImage from '../../assets/authImage.png'
import { useDispatch,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { loginUser,clearErrors} from "../../Redux/Actions/UserAction";
import Loader from "../../Components/Loader/Loader";

const Auth = () => {
  const {error,isAuthenticated,isLoading} = useSelector(state=>state.auth)
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const loginHandler=(e)=>{
    e.preventDefault();
    dispatch(loginUser(email,password))
    navigate('/profile')
  }
  useEffect(()=>{
   if(error){
    toast.error(error,{
      position:toast.POSITION.BOTTOM_CENTER
    })
    dispatch(clearErrors)
   }
   if(isAuthenticated){
     navigate('/profile')
   }

  },[isAuthenticated,error,dispatch,navigate])

  return (
    <>
    {isLoading ? <Loader/> : <div className="login-container">
      <div className="login-container-image">
        <img src={authImage} alt="" />
      </div>
      <div className="login-container-form">
        <form action="" onSubmit={loginHandler}>
          <div className="logo">Socialgram</div>
          <div className="form__group field">
            <input
              type="email"
              className="form__field"
              placeholder="Email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label for="email" className="form__label">
              Email
            </label>
          </div>
          <div className="form__group field">
            <input
              type="password"
              className="form__field"
              placeholder="Password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <label for="password" className="form__label">
              Password
            </label>
          </div>

          <button className="fill">Sign In</button>


          <p className="password-forgot"><Link to="password/forgot">Forgot Password?</Link></p>
          <p>Don't have an account?<Link to ='/register'>Sign Up</Link></p>


        </form>
      </div>
    </div>}
    </>
  );
};

export default Auth;
