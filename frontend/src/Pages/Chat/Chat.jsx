import React,{useState,useEffect} from 'react'
import './chat.css'
import axios from 'axios'
import ScrolledMessages from '../../Components/ScrolledMessages/ScrolledMessages'
import imgicon from '../../assets/default.jpg'
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch,useSelector } from 'react-redux';
import { fetchChats } from '../../Redux/Actions/ChatAction';

const Chat = () => {

  const [selectedChat,setSelectedChat]= useState()
  const [newMessage,setNewMessage] = useState('')
  const [messages,setMessages]= useState([])
  const [loading,setLoading]= useState(true)

const dispatch = useDispatch()

const {chats} = useSelector(state=>state.chat)

const fetchAllMessages= async()=>{
 try {
  setLoading(true)
  if(!selectedChat) return;

  const {data} = await axios.get(`/message/${selectedChat?._id}`)
  setMessages(data)
  setLoading(false)
 } catch (error) {
  console.log(error)
 }

}

const handleSendMessage=async(e)=>{
  if( newMessage){
    try {
      const config={
        headers:{'Content-Type': 'application/json'}
    }
      setNewMessage("")
    const {data} = await axios.post('/message/',{content: newMessage,chat: selectedChat?._id},config)
      
    } catch (error) {
       console.log(error);
    }

  }
}

useEffect(()=>{
dispatch(fetchChats())
fetchAllMessages()

},[dispatch,selectedChat])

  return (
    <div className="chat">
      <div className="chat-sidebar">
        <div className="chat-search-bar">
          <input type="text" placeholder="Search users" />
          <SearchIcon className="chat-search-icon"/>
        </div>
       <div className="chat-sidebar-body">
       {chats && chats.map((item)=>(
         <div className={selectedChat?._id ===item._id ? "chat-main-heading-selected" : "chat-main-heading"} key={item._id} onClick={()=>setSelectedChat(item)} >
         <div className="chat-main-user-pic"><img src={item.users[1].avatar.url ? item.users[1].avatar.url : imgicon} alt="" /></div>
         <div className="chat-main-user-name">{item.users[1].userName}</div>
       </div>
       ))}
       </div>
      </div>
      <div className="chat-divider">
    
      </div>
      <div className="chat-main">
        <div className="chat-main-heading">
          <div className="chat-main-user-pic"><img src={selectedChat?.users[1].avatar.url ? selectedChat?.users[1].avatar.url : imgicon} alt="" /></div>
          <div className="chat-main-user-name">{selectedChat?.users[1].userName}</div>
        </div>
        <div className="chat-main-body">
        <ScrolledMessages messages={messages} selectedChatUser={selectedChat?._id} />
        </div>
        <div className="chat-message-send-bar">
        <form action="">
        <input type="text" placeholder="Message..." value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}/>
           <SendIcon className="chat-message-send-icon" onClick={handleSendMessage}/>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Chat