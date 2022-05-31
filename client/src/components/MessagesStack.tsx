import React from 'react'
import '../css/messages-stack.css'
import useMessages from '../hook/useMessages'
import MessagesStackItem from './MessagesStackItem'

const MessagesStack = () => {
  const {messages} = useMessages()


  return (
    <div className='messages-stack'>
      {messages.map(message => {
        return <MessagesStackItem key={message.id} message={message} />
      })} 
    </div>
  )
}

export default MessagesStack