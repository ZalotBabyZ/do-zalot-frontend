import { useContext, useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import LocalStorageService from '../../services/localStorage';
import SelectProjectContext from '../../context/SelectProjectContext';

function BarNav({ page }) {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const selectProjectContext = useContext(SelectProjectContext);
  const [activeLogout, setActiveLogout] = useState(false);
  const navList = userContext.user
    ? [
        { page: userContext.user.username, url: '' },
        { page: 'FAQ', url: '/faq' },
        { page: 'CONTACT', url: '/contact' },
        { page: 'PROJECT', url: '/project' },
        { page: 'DASHBOARD', url: '/' },
      ]
    : [
        { page: 'FAQ', url: '/faq' },
        { page: 'CONTACT', url: '/contact' },
        { page: 'REGISTER', url: '/register' },
        { page: 'LOGIN', url: '/' },
      ];
  const navBtnWidth = userContext.role === 'guest' ? '25%' : '20%';
  const logoutHandler = () => {
    LocalStorageService.clearToken();
    userContext.setRole('guest');
    setActiveLogout(false);
    history.push('/');
  };

  return (
    <div className="container-bar-nav">
      <div className="nav-bar-block">
        {navList.map((pages, ind) =>
          userContext.user && pages.page === userContext.user.username ? (
            <button
              className="nav-list"
              style={{ width: navBtnWidth }}
              onMouseOver={() => setActiveLogout(true)}
              onMouseLeave={() => setActiveLogout(false)}
              onClick={logoutHandler}
              key={ind}
            >
              {activeLogout ? 'LOGOUT' : pages.page}
            </button>
          ) : pages.url === '/project' ? (
            <button
              className={`nav-list ${pages.url === page ? 'nav-list-active' : null}`}
              style={{ width: navBtnWidth }}
              disabled={!selectProjectContext.project}
              onClick={() => history.push(pages.url)}
              key={ind}
            >
              {pages.page}
            </button>
          ) : (
            <button
              className={`nav-list ${pages.url === page ? 'nav-list-active' : null}`}
              style={{ width: navBtnWidth }}
              onClick={() => history.push(pages.url)}
              key={ind}
            >
              {pages.page}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default BarNav;
