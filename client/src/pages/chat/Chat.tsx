import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChatItem from '../../components/ChatItem'
import useUser from '../../hook/useUser'
import IChat from '../../interfaces/chat'
import './chat.css'

const Chat = () => {
  const [chats, setChats] = useState<IChat[]>([])
  const {loginedUser} = useUser()
 
  useEffect(() => {
    getChats()
  }, [])

  async function getChats() {
    if (!loginedUser?._id) {
      return;
    }

    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/chat/member/${loginedUser?._id}`
    })

    const chats: IChat[] = await response.data


    setChats(chats)
  }

  

  return (
    <div className='chats'>
      <div className='chats__content'>
        {chats.map(chat => {
          return (
            <ChatItem key={chat._id} chat={chat} />
          )
        })}
      </div>
    </div>
  )
}

export default Chat