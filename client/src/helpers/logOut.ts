import { User } from './../interfaces/user';
import { NavigateFunction } from "react-router-dom";
import Message from "../interfaces/message";

export default function logOut(
  setLoginedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  navigate: NavigateFunction
) {
  localStorage.removeItem('anikihref-blog-app-x1');
  setLoginedUser(null);
  setMessages([]);
  navigate('/identification');
}
