import {LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    EDIT_USER_PROFILE_REQUEST,
    EDIT_USER_PROFILE_SUCCESS,
    EDIT_USER_PROFILE_FAIL,
    SEARCH_USER_PROFILE_SUCCESS,
    SEARCH_USER_PROFILE_REQUEST,
    SEARCH_USER_PROFILE_FAIL,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL} from '../Constants/UserContants'

export const authReducer = (state={user:{},userProfile:{},message:{}}, action) =>{
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                isLoading: true,
                isAuthenticated:false
            }
        case EDIT_USER_PROFILE_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
            return{
                isLoading: true,
            }
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
        case EDIT_USER_PROFILE_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user:action.payload
            }
        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
        case LOAD_USER_FAIL:
            return{
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user:null,
                error:action.payload
            }
        case CHANGE_PASSWORD_FAIL:
        case EDIT_USER_PROFILE_FAIL:
            return{
                isLoading: false,
                error:action.payload,
            }

        case GET_USER_PROFILE_REQUEST:
                return {
                    isLoading: true,
                }
          
            case GET_USER_PROFILE_SUCCESS:
                return{
                    ...state,
                    isLoading: false,
                    userProfile:action.payload
    
                }
      
            case GET_USER_PROFILE_FAIL:
                return{
                    ...state,
                    isLoading: false,
                    userProfile:null,
                    error:action.payload
                }
            case LOGOUT_USER_REQUEST:
            return{
                isLoading:true,
            }
 
        case LOGOUT_USER_SUCCESS:
            return{
                isLoading:false,
                user:null,
                isAuthenticated:false
            }

        case LOGOUT_USER_FAIL:
            return{
                isLoading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null

            } 
        default:
            return state
    }

}

export const getUsersReducer = (state={users:[]}, action) =>{
    switch (action.type) {
        case SEARCH_USER_PROFILE_REQUEST:
                return{
                    isLoading:true,
                }
            case SEARCH_USER_PROFILE_SUCCESS:
                return{
                    isLoading:false,
                    users:action.payload
                }
            case SEARCH_USER_PROFILE_FAIL:
                return{
                    isLoading:false,
                    error:action.payload
                }
                case CLEAR_ERRORS:
                    return{
                        ...state,
                        error:null
        
                    }
    
        default:
            return state
    }
}
export const followUsersReducer = (state={message:{}}, action) =>{
    switch (action.type) {
        case FOLLOW_USER_REQUEST:
        case UPDATE_AVATAR_REQUEST:
        case DELETE_USER_REQUEST:
            return{
                isLoading:true,
            }
        case FOLLOW_USER_SUCCESS:
        case UPDATE_AVATAR_SUCCESS:
        case DELETE_USER_SUCCESS:
            return{
                isLoading:false,
                message:action.payload
            }

        case FOLLOW_USER_FAIL:
        case UPDATE_AVATAR_FAIL:
        case DELETE_USER_FAIL:
            return{
                isLoading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
                    return{
                        ...state,
                        error:null
        
                    }
    
        default:
            return state
    }
}



