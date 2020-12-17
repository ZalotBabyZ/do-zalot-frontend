import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Project from '../pages/Project';
import FAQ from '../pages/FAQ';
import Contact from '../pages/Contact';

const allPages = {
  // path ของ user
  dashboard: {
    url: '/',
    page: Dashboard,
  },
  project: {
    url: '/project',
    page: Project,
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
  user: [allPages.dashboard, allPages.project, allPages.faq, allPages.contact],
};

export default permissionList;
