import React, { FC, useState } from 'react';
import Message from '../interfaces/message';

interface ChildrenProp {
  children: React.ReactNode;
}

export interface IMessageContext {
  messages: Message[];
  setMessages: (arg: Message[] | ((arg: Message[]) => Message[])) => void
}

export const MessagesContext = React.createContext<IMessageContext>({
  messages: [],
  setMessages: function () {},
});



const MessagesContextProvider: FC<ChildrenProp> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;