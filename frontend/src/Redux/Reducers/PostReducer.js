import { GET_ALL_POST_REQUEST,
    GET_ALL_POST_SUCCESS, 
    GET_ALL_POST_FAIL ,
    ADD_NEW_POST_REQUEST,
    ADD_NEW_POST_SUCCESS,
    ADD_NEW_POST_FAIL,
     CLEAR_ERRORS,
     LIKE_POST_REQUEST,
     LIKE_POST_SUCCESS,
     LIKE_POST_FAIL,
     COMMENT_POST_REQUEST,
     COMMENT_POST_SUCCESS,
     COMMENT_POST_FAIL} from '../Constants/PostConstant'; 

export const postReducer = (state={post:[],message:{}},action)=>{
    switch (action.type) {
        case GET_ALL_POST_REQUEST:
           return{
            isLoading : true,
            post:[]
           }

        case GET_ALL_POST_SUCCESS:
            return{
            ...state,
            isLoading : false,
            post:action.payload
            }
        case GET_ALL_POST_FAIL:
            return{
            ...state,
            isLoading : false,
            error:action.payload,
            post:null
            }
          
        case CLEAR_ERRORS:
            return {
            ...state,
            error:null
            }
        
        default:
            return state
    }

}
export const addNewPostReducer = (state={message:{}}, action) =>{
    switch (action.type) {
        case LIKE_POST_REQUEST:
        case COMMENT_POST_REQUEST:
        case ADD_NEW_POST_REQUEST:
            return{
                isLoading:true,
            }
            case LIKE_POST_SUCCESS:
            case ADD_NEW_POST_SUCCESS:
            case COMMENT_POST_SUCCESS:
            return{
              
                isLoading:false,
                message:action.payload
            }
        case LIKE_POST_FAIL:
        case ADD_NEW_POST_FAIL:
        case COMMENT_POST_FAIL:
            return{
                isLoading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
            ...state,
            error:null
            }
        
        default:
            return state
    }
    
}
