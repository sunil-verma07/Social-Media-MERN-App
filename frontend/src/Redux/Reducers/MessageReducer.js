// import {SEND_MESSAGE_REQUEST,SEND_MESSAGE_SUCCESS,SEND_MESSAGE_FAIL} from '../Constants/MessageConstant'

// export const messageReducer = (state={message:{}},action)=>{
//     switch (action.type) {
//         case SEND_MESSAGE_REQUEST:
//             return{
//              isLoading : true,
//              message:{}
//             }
 
//          case SEND_MESSAGE_SUCCESS:
//              return{
        
//              isLoading : false,
//              message:action.payload
//              }
//          case SEND_MESSAGE_FAIL:
//              return{
             
//              isLoading : false,
//              error:action.payload,
//              message:null
//              }
//              default:
//                 return state
        
    
//     }

// }