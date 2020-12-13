import jwt_decode from 'jwt-decode';

const getToken = () => {
  return localStorage.getItem('ACCESS_TOKEN');
};

const setToken = (token) => {
  localStorage.setItem('ACCESS_TOKEN', token);
};

const clearToken = () => {
  localStorage.clear();
};

const getUser = () => {
  if (getToken()) {
    const username = jwt_decode(localStorage.getItem('ACCESS_TOKEN')).username;
    const userVip = jwt_decode(localStorage.getItem('ACCESS_TOKEN')).userVip;
    const userProject = JSON.parse(localStorage.getItem('userProject'));
    return { role: 'user', username, userVip, userProject };
  }
  return { role: 'guest' };
};

export default {
  getToken,
  setToken,
  clearToken,
  getUser,
};
