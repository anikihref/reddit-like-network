import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import logOut from '../helpers/logOut';
import useMessages from '../hook/useMessages';
import useUser from '../hook/useUser';
import AccountButton from './AccountButton';

const Header: FC = () => {
  const { loginedUser, setLoginedUser } = useUser();
  const { setMessages } = useMessages();
  const navigate = useNavigate();

  function handleLogOut() {
    logOut(setLoginedUser, setMessages, loginedUser!, navigate);
  }

  return (
    <header className="header">
      <div className="header-navbar navbar">
        <NavLink to="/" className="navbar__link">
          Головна
        </NavLink>

        <NavLink to="/profile" className="navbar__link">
          Профіль
        </NavLink>
        
        <NavLink to="/chats" className="navbar__link">
          Чати
        </NavLink>
        
        <NavLink to="/search" className="navbar__link">
          Пошук
        </NavLink>
      </div>

      <AccountButton hasContextMenu={true}>
        <Link
          to="/profile"
          onClick={handleLogOut}
          className="context-menu__option"
        >
          Профіль
        </Link>

        <button onClick={handleLogOut} className="context-menu__option">
          Вийти
        </button>
      </AccountButton>
    </header>
  );
};

export default Header;
