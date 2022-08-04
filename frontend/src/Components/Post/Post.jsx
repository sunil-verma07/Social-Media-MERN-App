import React,{useEffect, useState} from 'react'
import './post.css'
import Modal from '@mui/material/Modal';
import {GoComment} from 'react-icons/go'
import {BsHeart , BsHeartFill} from 'react-icons/bs'
import { commentPost, getAllPosts, likeUnlikePost } from '../../Redux/Actions/PostAction'
import { useDispatch,useSelector } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import imgicon from '../../assets/default.jpg'

const Post = ({postId,image,likes,comments,userName,avatar,caption}) => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.auth)

  const [like, setLike] = useState(false)
  const [open,setOpen] = useState(false)
  const [comment,setComment]=useState('')

  const handleClose=()=>{
    setOpen(false)
  }

  const handleLike =()=>{
    setLike(!like)   
    dispatch(likeUnlikePost(postId))
  }

  const handleComment =(e)=>{
    dispatch(commentPost(postId,comment))
    window.location.reload()
    setComment('')
  }

  useEffect(()=>{
  likes?.forEach((item)=>{
    if(item._id === user?._id){
      setLike(true) 
    }
  })  

  },[dispatch,like])

  return  <div className="post" >
        <div className="post-header">
        <div className="image"><img src={avatar.url} alt="" /></div>
        <div className="user-name">{userName}</div>
        </div>
        <div className="post-image">
        <img src={image[0].url} alt="" />
        </div>
        <div className="post-reaction">
          <div className="icons">
          {like ? <BsHeartFill className="reaction-icon-liked" onClick={handleLike}/> : <BsHeart className="reaction-icon" onClick={handleLike}/> }
          <GoComment className="reaction-icon" onClick={()=>setOpen(true)} />
          <Modal
 onBackdropClick={handleClose}
        open={open}
      >
     <div className="comment-box">
     <div className="comment-bar">
     <input type="text" placeholder={`Comment as ${user && user.userName}`}  value={comment} onChange={(e)=>setComment(e.target.value)}/>
     <div className="comment-send-button"><SendIcon className="comment-send-icon" onClick={handleComment}/></div>
     </div>
     <div className="comment-body">
     {
      comments && comments.map((item)=>(
        <div className="post-comment" key={item._id}>
          <img src={item?.user.avatar.url ? item?.user.avatar.url : imgicon} alt="" />     
          <div className="user-name">{item.user.userName}</div>
          <div className="user-comment">{item.comment}</div>
  </div>
      ))
     }
  
     </div>
     </div>
      </Modal>
          </div>
          <div className="like-count">{likes.length} Likes</div>
        </div>
        <div className="post-caption">
        <div className="user-name">{userName}</div>
          <p>{caption}</p>
        </div>

        <div className="comments-count">{comments.length} Comments</div>
        {
          comments && comments.slice(0,2).map((item)=>(
            <div className="post-comment" key={item._id}>
          <img src={item.user.avatar.url ? item.user.avatar.url : imgicon} alt="" />     
          <div className="user-name">{item.user.userName}</div>
          <div className="user-comment">{item.comment}</div>
  </div>
          ))
        }
  
     
      </div>
    
  
}

export default Post