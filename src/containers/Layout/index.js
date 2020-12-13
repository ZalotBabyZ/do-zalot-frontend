import { useContext } from 'react';
import './style.css';
import UserContext from '../../context/UserContext';
import BarProject from '../../components/BarProject';
import NavProject from '../../components/NavProject';
function Layout({ children, role, setRole, page }) {
  const userContext = useContext(UserContext);

  return (
    <div className="layout-container">
      <div className="nav-bar"></div>
      <div className="bar-project-status">
        <BarProject />
      </div>
      <div className="page-head"></div>
      <div className="page-wrap">
        <div className="nav-project">
          <NavProject />
        </div>
        <div className="page-side"></div>
        <div className="page-container"> {children} </div>
      </div>
    </div>
  );
}

export default Layout;
