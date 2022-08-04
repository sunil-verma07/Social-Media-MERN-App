import axios from 'axios';
import {SEND_MESSAGE_REQUEST,SEND_MESSAGE_SUCCESS,SEND_MESSAGE_FAIL} from '../Constants/MessageConstant'


export const sendMessage = ({content,chatId})=>async(dispatch)=>{
    try {
        console.log(content,chatId)
        dispatch({type: SEND_MESSAGE_REQUEST})

        const config={
            headers:{'Content-Type': 'application/json'}
        }
        const {data} = await axios.post('/message/',{content,chatId},config)

        dispatch({type: SEND_MESSAGE_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type: SEND_MESSAGE_FAIL,payload:error.response.data.message})
    }
}