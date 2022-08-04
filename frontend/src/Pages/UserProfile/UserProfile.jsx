import React,{useEffect,useState} from 'react'
import './userprofile.css'
import {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { followUser, getUserProfile } from '../../Redux/Actions/UserAction'
import Loader from '../../Components/Loader/Loader'
import Tab from '../../Components/Tab/Tab'
import profileimage from '../../assets/default.jpg'
import {createChat} from '../../Redux/Actions/ChatAction'
import {useNavigate} from 'react-router-dom'

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const [followed,setFollowed] = useState(false)
    const {userProfile,isLoading,user} = useSelector(state=> state.auth)

    const followUserHandle = ()=>{
      dispatch(followUser(userProfile?._id))
      setFollowed(!followed)
    }
   
    const handleCreateChat=()=>{
      dispatch(createChat(id))
      navigate('/chat')
    }
    
    useEffect(() =>{
      dispatch(getUserProfile(id))

      if(isLoading === false){
        user.following.forEach((item)=>{
          if(item._id === user?._id){
            setFollowed(true)   
          }
            }) }

    },[id,dispatch])

    return isLoading ? <Loader/> : <div className="profile">
    {
      userProfile && <>
      <div className="user-details">
      <div className="image-section">
        <img src={userProfile.avatar ? userProfile.avatar.url : profileimage} alt="" />
      </div>
      <div className="user-personal-details">
        <div className="user-username">{userProfile.userName}</div>
        <div className="user-name">{userProfile.name}</div>
        { user && user._id === userProfile._id ? <div className="light-btn">edit profile</div> 
        : <div className="profile-btn-group">{followed ? <div className="light-btn" onClick={followUserHandle}>unfollow</div> : <div className="light-btn" onClick={followUserHandle}>Follow</div>}<div className="light-btn" onClick={handleCreateChat}>Message</div></div> }
      </div>
    </div>
  <div className="profile-posts">
  <Tab following={userProfile.following} followers={userProfile.followers} posts={userProfile.posts} id={userProfile._id}/>
  </div></>
    }
  </div>
      
    
  }
  


export default UserProfile