import { useContext } from 'react';
import { User } from '../interfaces/user';
import { IsLoginedContext, UserContext } from '../context/LoginedContext';


export default function useUser(): UserContext {
  return useContext(IsLoginedContext)
}