import { useContext } from 'react';
import { IsLoginedContext, UserContext } from '../context/LoginedContext';


export default function useUser(): UserContext {
  return useContext(IsLoginedContext)
}