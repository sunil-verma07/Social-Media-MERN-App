import axios from 'axios';
import { GET_ALL_POST_REQUEST,
         GET_ALL_POST_SUCCESS,
          GET_ALL_POST_FAIL ,
            ADD_NEW_POST_REQUEST, 
            ADD_NEW_POST_SUCCESS,
            ADD_NEW_POST_FAIL,
            LIKE_POST_REQUEST,
            LIKE_POST_SUCCESS,
            LIKE_POST_FAIL,
            COMMENT_POST_REQUEST,
            COMMENT_POST_SUCCESS,
            COMMENT_POST_FAIL,
        } from '../Constants/PostConstant'; 

export const getAllPosts = ()=> async(dispatch)=>{
try {
    dispatch({type:GET_ALL_POST_REQUEST})

    const {data} = await axios.get('/post/allposts')
    dispatch({type:GET_ALL_POST_SUCCESS,payload:data.allposts})

} catch (error) {

    dispatch({type:GET_ALL_POST_FAIL,payload:error.response.data.message})
}
}
export const addNewPost = (caption, image) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_NEW_POST_REQUEST,
      });
  
      const { data } = await axios.post(
        `/post/upload`,
        {
          caption,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: ADD_NEW_POST_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: ADD_NEW_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const likeUnlikePost = (postId)=> async (dispatch) =>{
   try {
     
    dispatch({type:LIKE_POST_REQUEST})
    const {data} = await axios.get(`/post/${postId}`)

    dispatch({type:LIKE_POST_SUCCESS,payload:data.message})
    
   } catch (error) {
       dispatch({type:LIKE_POST_FAIL,payload:error.response.data.message})
   }

}

export const commentPost = (postId,comment)=>async (dispatch) =>{
     try {
      console.log(postId,comment)
      dispatch({type:COMMENT_POST_REQUEST})

      const config ={headers:{'Content-Type': 'application/json'}}


      const {data} = await axios.put(`/post/comment/${postId}`,{comment},config)

      console.log(data)

      dispatch({type:COMMENT_POST_SUCCESS,payload:data})
      
     } catch (error) {
      dispatch({type:COMMENT_POST_FAIL,payload:error.response.data.message})
     }

}