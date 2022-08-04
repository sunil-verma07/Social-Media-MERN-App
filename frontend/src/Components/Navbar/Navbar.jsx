import React,{useState} from 'react'
import './navbar.css'
import {toast} from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import {Link} from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import SearchBox from '../SearchBox/SearchBox';
import {useSelector,useDispatch} from 'react-redux'
import { changePassword, logoutUser, removeUser } from '../../Redux/Actions/UserAction';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { Modal } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate()
   const dispatch = useDispatch()
  const [activeNav, setActiveNav] = useState('/')
  const [openModal,setOpenModal]= useState(false)
  const [oldPassword,setOldPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const[open,setOpen] = useState(false)
  const[anchorEl,setAnchorEl] = useState()
 const {user,isAuthenticated} = useSelector(state=> state.auth)

  const handleClose=()=>{
    setOpen(false)
  }

  const handleCloseModal =()=>{
    setOpenModal(false)
  }

  const handleDeleteAccount =()=>{
    dispatch(removeUser())
  }

 const handleClick=(e)=>{
  setAnchorEl(e.currentTarget);
  setOpen(true);
 }
 const logoutHandler=()=>{
dispatch(logoutUser())

  toast.success("Logout Successful",{
  position:toast.POSITION.BOTTOM_CENTER
})
 }
 const changePasswordHandler=()=>{
  dispatch(changePassword(oldPassword,newPassword))
  toast.success("Password Updates successful",{
    position:toast.POSITION.BOTTOM_CENTER
  })

 }
 useEffect(()=>{
  if(!isAuthenticated)
  navigate('/login')

 },[navigate])
  return (
<div className="navbar">
        <div className="icons">
            <Link to="/" onClick={()=>setActiveNav('/')} className={activeNav === '/' ? 'active' : ''}><HomeIcon className="svg-icons"/></Link>
            <SearchBox />
            <Link to="/addpost" onClick={()=>setActiveNav('/addpost')} className={activeNav === '/addpost' ? 'active' : ''}><AddCircleRoundedIcon className="svg-icons svg-add"/></Link>
            <Link to="/chat" onClick={()=>setActiveNav('/chat')} className={activeNav === '/chat' ? 'active' : ''}><MessageIcon className="svg-icons"/></Link>
            
            <a onClick={(e)=>setActiveNav('/profile')} className={activeNav === '/profile' ? 'active' : ''}><img src={user?.avatar.url} className="svg-icons" onClick={handleClick} /></a>
            <Menu
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorEl={anchorEl}
        id="account-menu"
      >
        <MenuItem>
         <Link to="/profile">Profile</Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=>setOpenModal(true)}>
          Change Password
        </MenuItem>
        <MenuItem onClick={handleDeleteAccount}>
         <a href="/login"> Delete Account</a>
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
         Logout
        </MenuItem>
      </Menu>

      <Modal
        onBackdropClick={handleCloseModal}
       open={openModal}>
        <div className="edit-password">
        <div className="edit-password-title">Edit Password</div>
        
          <div className="form__group field">
            <input
              type="password"
              className="form__field"
              placeholder="Old Password"
              name="password"
              id="password"
              required
              value={oldPassword}
              onChange={(e)=>setOldPassword(e.target.value)}
            />
            <label htmlFor="password" className="form__label">
              Old Password
            </label>
          </div>
          <div className="form__group field">
            <input
              type="password"
              className="form__field"
              placeholder="New Password"
              name="new-password"
              id="new-password"
              required
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
            />
            <label htmlFor="password" className="form__label">
              New Password
            </label>
          </div>
          <div className="light-btn" onClick={changePasswordHandler}><a href="/profile">Update Password</a></div>
          <div className="light-btn" onClick={handleCloseModal}>Cancel</div>
        </div>
      </Modal>


        </div>
    </div>
  )
}

export default Navbar