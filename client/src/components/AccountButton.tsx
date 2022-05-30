import React, { FC, useState } from 'react';
import useUser from '../hook/useUser';
import ContextMenu from './ContextMenu';

interface AccountButtonProps {
  children?: React.ReactNode;
  hasContextMenu: boolean;
}

const AccountButton: FC<AccountButtonProps> = ({ children, hasContextMenu }) => {
  const [activeUserMenu, setActiveUserMenu] = useState<boolean>(false);
  const { loginedUser } = useUser();

  return (
    <div
      className="account-btn"
      onClick={() => setActiveUserMenu((prev) => !prev)}
    >
      <div className="account-btn__pfp">
        <img
          src={loginedUser?.pfp || require('../assets/img/anonymous-pfp.png')}
          alt="pfp"
        />
      </div>
      <div className="account-btn__name">{loginedUser?.username}</div>

      {hasContextMenu && (
        <ContextMenu isActive={activeUserMenu}>{children}</ContextMenu>
      )}
    </div>
  );
};

export default AccountButton;
