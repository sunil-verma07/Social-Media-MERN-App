import React,{useEffect, useState} from 'react'
import './profile.css'
import profileimage from '../../assets/default.jpg'
import 'react-best-tabs/dist/index.css';
import Tab from '../../Components/Tab/Tab'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../../Components/Loader/Loader';
import {Dialog,DialogContent,DialogContentText,DialogActions} from '@mui/material'
import { editUserProfile, updateAvatar } from '../../Redux/Actions/UserAction';
import { Modal } from '@mui/material';
import {BsImageFill} from 'react-icons/bs'
import {toast} from 'react-toastify'

const Profile = () => {
  const {user,isLoading} = useSelector(state=> state.auth)
  const {message,error,success} = useSelector(state=> state.followUser)
  const dispatch = useDispatch()

  const [profileDialogOpen,setProfileDialogOpen]= useState(false)
  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [userName,setUserName]= useState('')
  const [openModal,setOpenModal] = useState(false)
  const [avatar,setAvatar] = useState()

  const editProfileHandler=(e)=>{
    e.preventDefault()
    dispatch(editUserProfile(name,userName,email))
    setProfileDialogOpen(false)
    window.location.reload()
  }

  const handleCloseModal =()=>{
    setOpenModal(false)
  }
  const handleAvatarChange=(e)=>{
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  }
  const submitAvatarChange =()=>{

    dispatch(updateAvatar(avatar))
    setOpenModal(false)
  }
  useEffect(()=>{
    if(success === true){
      toast.success(message,{
        position:toast.POSITION.BOTTOM_CENTER
      })
      
    }
    if(success === false){
      toast.error(error,{
        position:toast.POSITION.BOTTOM_CENTER
      })
     
    }
    
  })

  return isLoading ? <Loader/> : <div className="profile">
  {
    user && <>
    <div className="user-details">
    <div className="image-section">
      <img src={user.avatar ? user.avatar.url : profileimage} alt=""  onClick={()=>setOpenModal(true)}/>
      <Modal
        onBackdropClick={handleCloseModal}
       open={openModal}>
        <div className="modal-avatar">
          <div className="avatar-preview">
           {avatar ?  <><img src={avatar} alt="" /></> :  <><BsImageFill className="avatar-update-icon"/><div className="light-btn"><input type="file" className="image-upload-btn" onChange={handleAvatarChange}/>Upload Avatar</div></>}
          </div>
          <div className="light-btn" onClick={submitAvatarChange}>Update Avatar</div>
        </div>
       </Modal>
    </div>
    <div className="user-personal-details">
      <div className="user-username">{user.userName}</div>
      <div className="user-name">{user.name}</div>
      <div className="light-btn" onClick={()=>setProfileDialogOpen(true)}>edit profile</div>
      <Dialog open = {profileDialogOpen}>
        <div className="edit-profile-dialog-title">Edit Profile</div>
        <DialogContent>
          <DialogContentText>
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
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="light-btn" onClick={()=>setProfileDialogOpen(false)}>Cancel</div>
          <div className="light-btn" onClick={editProfileHandler}><a href="/profile">Update</a></div>
        </DialogActions>
      </Dialog>
    </div>
  </div>
<div className="profile-posts">
<Tab following={user.following} followers={user.followers} posts={user.posts} id={user._id}/>
</div></>
  }
</div>
    
  
}

export default Profile