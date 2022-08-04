import React,{useState,useEffect} from 'react'
import './searchbox.css'
import Modal from '@mui/material/Modal';
import Loader from '../Loader/Loader'
import imgicon from '../../assets/default.jpg'
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch,useSelector} from 'react-redux'
import { searchUserProfile } from '../../Redux/Actions/UserAction';

const SearchBox = () => {
    const dispatch = useDispatch()
    const [open,setOpen] = useState(false)
    const [searchQuery,setSearchQuery] = useState('')

    const {isLoading,users} = useSelector(state=> state.getUsers)

    const handleClose = () => {
       setOpen(false)
    }
    const handleSearch = () => {
      dispatch(searchUserProfile(searchQuery))
    }
    useEffect(()=>{

    },[dispatch,users])

  return (
    <div className="search-box">
 <a ><SearchIcon className="svg-icons" onClick={()=>setOpen(true)}/></a>
 <Modal
 onBackdropClick={handleClose}
        open={open}
      >

        <div className="search-list">
        <div className="search-bar-back">
        <div className="search-input-bar">
          <input type="text" placeholder="Search" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
         
          <SearchIcon className="search-icon-svg" onClick={handleSearch}/>
          
        </div>
        </div>
        {isLoading ? <Loader/> : <>
        {
          users.length !==0 ? users.map((user)=>(
            <div className="search-userlist">
          <div className="search-list-header">
        <div className="search-details-list">
        <div className="image"><img src={user.avatar ? user.avatar : imgicon} alt="" /></div>
         <a href={`/profile/${user._id}`}><div className="user-name">{user.userName}</div></a>
        </div>
         <div className="follow-btn">Follow</div>
         </div>
     </div> 
          ) ) : <div className="no-users-search"><SearchIcon className="no-users-search-icon"/><p>Search Results</p></div>
        }</>}
        </div>
      </Modal>

    </div>
  )
}

export default SearchBox