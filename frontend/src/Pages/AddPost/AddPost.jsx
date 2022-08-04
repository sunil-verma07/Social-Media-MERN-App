import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import './addpost.css'
import {useNavigate} from 'react-router-dom'
import {loadUser} from '../../Redux/Actions/UserAction'
import {addNewPost} from '../../Redux/Actions/PostAction'
import imgicon from '../../assets/default.jpg'
import {BsImageFill} from 'react-icons/bs'
import {toast} from 'react-toastify'

const AddPost = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [caption,setCaption] = useState('')
  const [image,setImage]=useState('')
  const {user} = useSelector(state=>state.auth)
  const {message} = useSelector(state=>state.newPost)


  const handleImageChange=(e)=>{
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  }

  const postDetails = async(e)=>{
    e.preventDefault();
     dispatch(addNewPost(caption, image));
    dispatch(loadUser());
    navigate('/profile')
  }
  if(message){
    toast.success(message,{
      position:toast.POSITION.BOTTOM_CENTER
    });
  }

  return (
   <div className="addpost">
    <div className="add-image-section">
     
    { image ? <img src={image} alt=""/> :  <><BsImageFill className="upload-image-icon"/>
      <div className="light-btn"><input type="file" className="image-upload-btn" onChange={handleImageChange}/>Upload Image</div></>}
    </div>
    <div className="add-image-details">
      <div className="add-image-details-header">
        <div className="add-image-details-user-info">
        <div className="image"><img src={user?.avatar.url ? user?.avatar.url : imgicon} alt="" /></div>
        <div className="user-name">{user?.userName}</div>
        </div>
       
      </div>
      <textarea rows="6" cols="20"  placeholder="Enter Caption Here..." onChange={(e)=>setCaption(e.target.value)}/>
        <div className="upload-btn" onClick={postDetails}>Upload</div>
    </div>
   </div>
  )
}

export default AddPost