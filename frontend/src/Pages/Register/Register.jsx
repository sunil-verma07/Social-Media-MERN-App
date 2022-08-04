import React,{useState} from 'react';
import './register.css'
import {toast} from 'react-toastify'
import { registerUser,clearErrors } from '../../Redux/Actions/UserAction';
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import Loader from '../../Components/Loader/Loader';
import authImage from '../../assets/authImage.png'


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isAuthenticated,error,isLoading} = useSelector(state=> state.auth)

  const [name,setName] = useState('')
  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const registerHandler=(e)=>{
    e.preventDefault()
    dispatch(registerUser(name,userName,email,password))
    navigate('/profile')
  }
  useEffect(()=>{
      if(error){
        toast.error(error,{
          position: toast.POSITION.BOTTOM_CENTER
        })
        dispatch(clearErrors());
      }
      if(isAuthenticated){
        toast.success("Registration Successful",{
          position:toast.POSITION.BOTTOM_CENTER
        })
        navigate('/profile')
      }
     
     },[isAuthenticated,error,navigate,dispatch])

  return (
    <div>
       {isLoading ? <Loader/> :   <div className="register-container">
      <div className="login-container-image">
        <img src={authImage} alt="" />
      </div>
      <div className="register-container-form">
        <form action="" onSubmit={registerHandler}>
          <div className="logo">Socialgram</div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="name"
              name="name"
              id="name"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <label htmlFor="name" className="form__label">
              Name
            </label>
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Username"
              name="username"
              id="username"
              required
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
            />
            <label htmlFor="username" className="form__label">
              Username
            </label>
          </div>
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
            <label htmlFor="email" className="form__label">
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
            <label htmlFor="password" className="form__label">
              Password
            </label>
          </div>

          <button className="fill" type='submit'>Sign Up</button>


          <p>Already have account?<Link to ='/login'>Sign In</Link></p>


        </form>
      </div>
    </div>}
    </div>
  )
}

export default Register