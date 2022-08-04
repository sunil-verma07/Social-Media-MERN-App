import axios from 'axios'
import {CREATE_CHAT_REQUEST,CREATE_CHAT_SUCCESS,CREATE_CHAT_FAIL,FETCH_ALL_CHATS_REQUEST,FETCH_ALL_CHATS_SUCCESS,FETCH_ALL_CHATS_FAIL} from '../Constants/ChatConstant.js'


export const createChat = (userId)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_CHAT_REQUEST});

        const config={
            headers:{"Content-Type":"application/json"}
        }

        const {data} = await axios.post('/chat/',{userId},config)

        dispatch({type:CREATE_CHAT_SUCCESS,payload:data})

        
    } catch (error) {

        dispatch({type:CREATE_CHAT_FAIL,payload:error.response.data.message})
        
    }
}

export const fetchChats = ()=>async(dispatch)=>{
    try {
        dispatch({type:FETCH_ALL_CHATS_REQUEST})

        const {data} = await axios.get('/chat/')

        dispatch({type:FETCH_ALL_CHATS_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:FETCH_ALL_CHATS_FAIL,payload:error.response.data.message})
    }
}