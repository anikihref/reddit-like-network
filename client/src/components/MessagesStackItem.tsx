import React, { FC, useEffect } from 'react'
import useMessages from '../hook/useMessages';
import Message from '../interfaces/message';
import BlueButton from './BlueButton';

const MessagesStackItem: FC<{message: Message}> = ({ message }) => {
  const { setMessages } = useMessages()

  useEffect(() => {
    setTimeout(() => {
      handleClose()
    }, 15_000)
  }, [])

  function handleClose() {
    setMessages(prev => prev.filter(filterMessage => filterMessage.id !== message.id))
  }

  return (
    <div className='messages-stack__message'>
      <div className="messages-stack__message-content">
        <div className="messages-stack__message-title">{ message.title }</div>
        <div className="messages-stack__message-text">{ message.text }</div>
      </div>
      

      <BlueButton btnType='button' text='close' cb={handleClose} className="messages-stack__message-close" />
    </div>
  )
}

export default MessagesStackItem