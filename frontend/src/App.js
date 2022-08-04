import React,{useEffect} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Login from './Pages/Login/Login'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home'
import AddPost from './Pages/AddPost/AddPost'
import Chat from './Pages/Chat/Chat'
import Profile from './Pages/Profile/Profile'
import { loadUser } from './Redux/Actions/UserAction'
import UserProfile from './Pages/UserProfile/UserProfile'
import SearchBox from './Components/SearchBox/SearchBox'

const App = () => {
  const dispatch = useDispatch()
  const {isAuthenticated} = useSelector(state => state.auth)

  useEffect(()=>{
  dispatch(loadUser())

  },[dispatch])

  return (
<Router>
  {isAuthenticated && <Navbar/>}
  <Routes>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/search' element={<SearchBox/>}/>
    <Route exact path='/chat' element={<Chat/>}/>
    <Route exact path='/addpost' element={<AddPost/>}/>
    <Route exact path='/profile' element={<Profile/>}/>
    <Route exact path='/profile/:id' element={<UserProfile/>}/>
  </Routes>
</Router>
  )
}

export default App