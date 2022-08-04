import React from 'react'
import {useSelector} from 'react-redux'
import './messages.css'

const ScrolledMessages = ({messages,selectedChatUser}) => {
 const {user} = useSelector(state => state.auth)

  return (
    <div className="scrolled-chats">
        {messages && messages.map((message) =>(
            <div className="chats-align" key={message._id}>
                <p className="msg" style={{backgroundColor:`${message.sender._id===user._id ? "#dcdcdc" : "#adadfb"}`, 
            color:`${message.sender._id===user._id ? "#000" : "#fff"}`,
            marginLeft:`${message.sender._id===user._id ? "auto" : "0"}`
             }}>
                {message.content}</p>
            </div>
        ))}
    </div>

  )
}

export default ScrolledMessages