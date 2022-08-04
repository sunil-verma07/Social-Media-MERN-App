import {CREATE_CHAT_REQUEST,CREATE_CHAT_SUCCESS,CREATE_CHAT_FAIL,FETCH_ALL_CHATS_REQUEST,FETCH_ALL_CHATS_SUCCESS,FETCH_ALL_CHATS_FAIL} from '../Constants/ChatConstant.js'



export const chatReducer = (state={chat:{},chats:[]},action)=>{
    switch (action.type) {
        case CREATE_CHAT_REQUEST:
           return{
            isLoading : true,
            chat:{}
           }

        case CREATE_CHAT_SUCCESS:
            return{
            ...state,
            isLoading : false,
            chat:action.payload
            }
        case CREATE_CHAT_FAIL:
            return{
            ...state,
            isLoading : false,
            error:action.payload,
            chat:null
            }
        case FETCH_ALL_CHATS_REQUEST:
                return{
                 isLoading : true,
                 chats:[]
                }
     
        case FETCH_ALL_CHATS_SUCCESS:
                 return{
                 ...state,
                 isLoading : false,
                 chats:action.payload
                 }
        case FETCH_ALL_CHATS_FAIL:
                 return{
                 ...state,
                 isLoading : false,
                 error:action.payload,
                 chats:null
                 }
             
          
        
        default:
            return state
    }

}