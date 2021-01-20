import { useContext } from 'react';
import './style.css';
import BarProject from '../../components/BarProject';
import NavProject from '../../components/NavProject';
import BarNav from '../../components/BarNav';
import UserContext from '../../context/UserContext';

function Layout({ children, page }) {
  const userContext = useContext(UserContext);
  return (
    <div className="layout-container">
      <div className="nav-head">
        <div className="nav-bar">
          <BarNav page={page} />
        </div>
        <div className="bar-project-status">
          <BarProject />
        </div>
      </div>
      <div className="page-head"></div>

      <NavProject page={page} />

      <div className="page-wrap">
        <div className={`page-side ${userContext.role === 'guest' ? 'page-side--none' : null}`}></div>
        <div className="page-container"> {children} </div>
      </div>
    </div>
  );
}

export default Layout;
