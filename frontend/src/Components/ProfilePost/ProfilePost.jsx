import React,{useState} from 'react'
import './profilepost.css'

const ProfilePost = ({posts}) => {

  return (<div className="profileposts">

  { posts &&  posts.map((item)=>(
         <div className="profile-post" key={item.image[0].public_id}>
         <img src={item.image[0].url} />
         
     </div>
     ))
 } 

 
</div>)
    
  
}

export default ProfilePost