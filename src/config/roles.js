import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import NewProject from '../pages/NewProject';
import FAQ from '../pages/FAQ';
import Contact from '../pages/Contact';

const allPages = {
  // path ของ user
  dashboard: {
    url: '/',
    page: Dashboard,
  },
  newProject: {
    url: '/newProject',
    page: NewProject,
  },
  // path ของ guest
  login: {
    url: '/',
    page: Login,
  },
  register: {
    url: '/register',
    page: Register,
  },
  // path ที่เข้าถึงได้ทุกคน
  faq: {
    url: '/faq',
    page: FAQ,
  },
  contact: {
    url: '/contact',
    page: Contact,
  },
};

const permissionList = {
  guest: [allPages.login, allPages.register, allPages.faq, allPages.contact],
  user: [allPages.dashboard, allPages.newProject, allPages.faq, allPages.contact],
};

export default permissionList;
