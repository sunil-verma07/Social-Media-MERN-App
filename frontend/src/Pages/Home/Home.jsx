import React, { useEffect } from 'react'
import './home.css'
import Post from '../../Components/Post/Post'
import {useSelector,useDispatch} from 'react-redux'
import { getAllPosts } from '../../Redux/Actions/PostAction'
import Loader from '../../Components/Loader/Loader.jsx'

const Home = () => {
  const dispatch = useDispatch()
  const {isLoading,post} = useSelector(state=> state.post)

  useEffect(()=>{

    dispatch(getAllPosts())

  },[dispatch])

  return  isLoading ? <Loader/> : <div className="home">
    {post && post.map((item)=>(
      <Post key={item?._id} postId={item?._id} image={item?.image} likes={item?.likes} comments={item?.comments} userName={item?.owner.userName} avatar={item?.owner.avatar} caption={item?.caption}/>
    ))}
  </div>

  
}
export default Home