import { MessagesContext, IMessageContext } from './../context/MessagesContext';
import { useContext } from 'react';


export default function useMessages(): IMessageContext {
  return useContext(MessagesContext)
}