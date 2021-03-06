import React, { FC, useEffect } from 'react';
import useMessages from '../hook/useMessages';
import Message from '../interfaces/message';
import BlueButton from './BlueButton';

const MessagesStackItem: FC<{
  message: Message;
}> = ({ message }) => {
  const { setMessages } = useMessages();

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 15_000);
  }, []);

  function handleClose() {
    setMessages((prev) =>
      prev.filter((filterMessage) => filterMessage.id !== message.id)
    );
  }

  return (
    <div className="messages-stack__item">
      <div
        className="messages-stack__item-content"
        onClick={message.callback ? message.callback : () => {}}
      >
        <div className="messages-stack__item-title">{message.title}</div>
        <div className="messages-stack__item-text">{message.text}</div>
      </div>

      <BlueButton
        btnType="button"
        cb={handleClose}
        className="messages-stack__item-close"
      >Закрити</BlueButton>
    </div>
  );
};

export default MessagesStackItem;
