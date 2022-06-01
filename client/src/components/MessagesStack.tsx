import React from 'react';
import '../css/messages-stack.css';
import useMessages from '../hook/useMessages';
import MessagesStackItem from './MessagesStackItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const MessagesStack = () => {
  const { messages } = useMessages();

  return (
    <TransitionGroup className="messages-stack">
      {messages.map((message) => (
        <CSSTransition key={message.id} timeout={300} classNames='messages-stack__item'>
          <MessagesStackItem message={message} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default MessagesStack;
