import { useContext, useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import LocalStorageService from '../../services/localStorage';

function BarNav({ page }) {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [activeLogout, setActiveLogout] = useState(false);
  const navList =
    userContext.role === 'guest'
      ? [
          { page: 'FAQ', url: '/faq' },
          { page: 'CONTACT', url: '/contact' },
          { page: 'REGISTER', url: '/register' },
          { page: 'LOGIN', url: '/' },
        ]
      : [
          { page: userContext.username, url: '' },
          { page: 'FAQ', url: '/faq' },
          { page: 'CONTACT', url: '/contact' },
          { page: 'NEW_PROJECT', url: '/register' },
          { page: 'DASHBOARD', url: '/' },
        ];
  const navBtnWidth = userContext.role === 'guest' ? '25%' : '20%';
  const logoutHandler = () => {
    LocalStorageService.clearToken();
    userContext.setRole('guest');
    history.push('/');
    // window.location.reload();
  };
  return (
    <div className="container-bar-nav">
      <div className="nav-bar-block">
        {navList.map((pages) =>
          pages.page !== userContext.username ? (
            <button
              className={`nav-list ${pages.url === page ? 'nav-list-active' : null}`}
              style={{ width: navBtnWidth }}
              onClick={() => history.push(pages.url)}
            >
              {pages.page}
            </button>
          ) : (
            <button
              className="nav-list"
              style={{ width: navBtnWidth }}
              onMouseOver={() => setActiveLogout(true)}
              onMouseLeave={() => setActiveLogout(false)}
              onClick={logoutHandler}
            >
              {activeLogout ? 'LOGOUT' : pages.page}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default BarNav;
