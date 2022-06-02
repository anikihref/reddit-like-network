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
        <NavLink className="navbar__link" to='/'>Головна</NavLink>
        <NavLink className="navbar__link" to={`/profile`}>Профіль</NavLink>
        <NavLink className="navbar__link" to='/chats'>Чати</NavLink>
        <NavLink className="navbar__link" to='/search'>Пошук</NavLink>
      </div>
      <AccountButton hasContextMenu={true} user={loginedUser!}>
        <Link
          to="/profile"
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
