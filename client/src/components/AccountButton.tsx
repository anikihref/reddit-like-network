import React, { FC, useState } from 'react';
import useUser from '../hook/useUser';
import { User } from '../interfaces/user';
import ContextMenu from './ContextMenu';

interface AccountButtonProps {
  children?: React.ReactNode;
  hasContextMenu: boolean;
  user: User;
}

const AccountButton: FC<AccountButtonProps> = ({ children, hasContextMenu, user }) => {
  const [activeUserMenu, setActiveUserMenu] = useState<boolean>(false);

  return (
    <div
      className="account-btn"
      onClick={() => setActiveUserMenu((prev) => !prev)}
      data-context-trigger={hasContextMenu ? true : false}
    >
      <div className="account-btn__pfp">
        <img
          src={user?.pfp || require('../assets/img/anonymous-pfp.png')}
          alt="pfp"
        />
      </div>
      <div className="account-btn__name">{user?.username}</div>

      {hasContextMenu && (
        <ContextMenu isActive={activeUserMenu} setIsActive={setActiveUserMenu}>{children}</ContextMenu>
      )}
    </div>
  );
};

export default AccountButton;
