import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../hook/useUser';
import AccountButton from './AccountButton';

const Header: FC = () => {
  const { setLoginedUser } = useUser();
  const navigate = useNavigate()

  function handleLogOut() {
    localStorage.removeItem('anikihref-blog-app-x1');
    setLoginedUser(null);
    navigate('/identification')
  }

  return (
    <header className="header">
      <div className="header-navbar navbar">
        <div className="navbar__logo">Anikihref</div>

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
      </div>
    </header>
  );
};

export default Header;
