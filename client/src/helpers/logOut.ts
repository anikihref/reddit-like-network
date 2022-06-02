import { User } from './../interfaces/user';
import { NavigateFunction } from 'react-router-dom';
import Message from '../interfaces/message';
import uniqid from 'uniqid';
import logIn from './logIn';

export default function logOut(
  setLoginedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  data: User,
  navigate: NavigateFunction
) {
  localStorage.removeItem('anikihref-blog-app-x1');
  setLoginedUser(null);

  setMessages([
    {
      text: `Do you want to return back to ${data.name}?`,
      title: `${data.name} leaved!`,
      id: uniqid(),
      callback: () => {
        logIn(setLoginedUser, setMessages, data, navigate)
      }
    },
  ]);

  navigate('/identification');
}
