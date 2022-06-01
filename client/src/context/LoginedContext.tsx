import React, { FC, useState } from 'react';
import { User } from '../interfaces/user';

interface ChildrenProp {
  children: React.ReactNode;
}

export interface UserContext {
  loginedUser: User | null;
  setLoginedUser: React.Dispatch<React.SetStateAction<User | null>>;
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
