import React,{useState} from 'react'
import ProfilePost from '../ProfilePost/ProfilePost'
import './tab.css'
import imgicon from '../../assets/default.jpg'


const Tab = ({following,followers,posts}) => {



    const [tabIndex,setTabIndex] =useState(1)
  return (
    <div className="tab">

<div className="tab-wrap">
  
    <input type="radio" name="tabs" id="tab1" onClick={() => setTabIndex(1)} checked={tabIndex === 1 ? "checked" : ""} />
    <div className="tab-label-content" id="tab1-content">
      <label htmlFor="tab1">Post({posts && posts.length})</label>
      <div className="tab-content"><ProfilePost posts={posts}/></div>
    </div>
     
    <input type="radio" name="tabs" id="tab2" onClick={() => setTabIndex(2)} checked={tabIndex === 2 ? "checked" : ""} />
    <div className="tab-label-content" id="tab2-content">
      <label htmlFor="tab2">Followers({followers && followers.length})</label>
      <div className="tab-content">{followers && followers.map((item)=>(
            <div className="userlist" key={item._id}>
            <div className="user-list-header">
          <div className="user-details-list">
          <div className="image"><img src={item.avatar.url ? item.avatar.url : imgicon} alt="" /></div>
           <a href={`/profile/${item._id}`}><div className="user-name">{item.userName && item.userName}</div></a>
          </div>
           </div>
       </div>
      ))}</div>
    </div>
    
    <input type="radio" name="tabs" id="tab3" onClick={() => setTabIndex(3)} checked={tabIndex === 3 ? "checked" : ""} />
    <div className="tab-label-content" id="tab3-content">
      <label htmlFor="tab3">Following({following && following.length})</label>
      <div className="tab-content">{following && following.map((item)=>(   
      <div className="userlist" key={item._id}>
         <div className="user-list-header">
       <div className="user-details-list">
       <div className="image"><img src={item.avatar.url ? item.avatar.url : imgicon} alt="" /></div>
        <a href={`/profile/${item._id}`}><div className="user-name">{item.userName && item.userName}</div></a>
       </div>
        </div>
    </div>))}</div>
    </div>
    <div className="slide"></div>
  
</div>



    </div>
  )
}

export default Tab