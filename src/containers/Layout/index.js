import './style.css';
import BarProject from '../../components/BarProject';
import NavProject from '../../components/NavProject';
import BarNav from '../../components/BarNav';

function Layout({ children, page }) {
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

      <NavProject />

      <div className="page-wrap">
        <div className="page-side"></div>
        <div className="page-container"> {children} </div>
      </div>
    </div>
  );
}

export default Layout;
