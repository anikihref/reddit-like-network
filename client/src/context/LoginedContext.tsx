import React, { FC, useState } from 'react';
import { User } from '../interfaces/user';

interface ChildrenProp {
  children: React.ReactNode;
}

export interface UserContext {
  loginedUser: User | null;
  setLoginedUser:
    (arg: (User | null) | ((arg2: User | null) => User)) => void

}

export const IsLoginedContext = React.createContext<UserContext>({
  loginedUser: null,
  setLoginedUser: function () {},
});



const LoginedContext: FC<ChildrenProp> = ({ children }) => {
  const [loginedUser, setLoginedUser] = useState<User | null>(null);

  return (
    <IsLoginedContext.Provider value={{ loginedUser, setLoginedUser }}>
      {children}
    </IsLoginedContext.Provider>
  );
};

export default LoginedContext;
