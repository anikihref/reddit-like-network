import { NavigateFunction } from 'react-router-dom';
import uniqid from 'uniqid';
import Message from '../interfaces/message';
import { User } from '../interfaces/user';

export default function logIn(
  setLoginedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  data: User,
  navigate: NavigateFunction
) {
  setLoginedUser(data);
  setMessages((prev) => {
    prev.push({
      text: `Hi ${data.name}! Welcome to anikihref react blog`,
      title: `${data.name} connected`,
      id: uniqid(),
    });

    return prev;
  });

  navigate('/profile', { replace: true });
  localStorage.setItem(
    'anikihref-blog-app-x1',
    `${data.username}+${data.password}`
  );
}
