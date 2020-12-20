import React from 'react';
import { useState, useContext } from 'react';
import InputField from '../../components/InputField';
import './style.css';
import axios from '../../config/axios';
import { notification } from 'antd';
import LocalStorageService from '../../services/localStorage';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function Login() {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [value, setValue] = useState({});
  const [validate, setValidate] = useState({ password: false, username: false });

  const disableBtn = () => {
    for (let key in validate) {
      if (!validate[key]) return true;
    }
    return false;
  };

  const valueGet = (fieldValue, field, isAlert) => {
    setValue({ ...value, [field]: fieldValue });
    isAlert ? setValidate({ ...validate, [field]: false }) : setValidate({ ...validate, [field]: true });
  };

  const loginHandler = () => {
    axios
      .post('/users/login', { username: value.username, password: value.password })
      .then((res) => {
        notification.success({
          description: 'Login Success',
        });
        LocalStorageService.clearToken();
        LocalStorageService.setToken(res.data.token);
        localStorage.setItem('userProject', JSON.stringify(res.data.userProject));
        userContext.setRole('user');
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: 'Login Not Success',
        });
      });

    history.push('/');
  };
  return (
    <div className="page" style={{ height: '85vh' }}>
      <div className="page-login">
        <div className="card card--primary card-login">
          <div style={{ width: '100%', height: '30px' }}></div>
          <InputField
            name="username"
            label="Username:"
            type="text"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            maxLength={20}
            minLength={3}
            need={true}
            width="80%"
            primaryColor={true}
          />
          <InputField
            name="password"
            label="Password:"
            type="text"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            minLength={8}
            need={true}
            width="80%"
            primaryColor={true}
          />
          <div className="block-btn">
            <button className="btn-submit btn--primary" onClick={loginHandler} disabled={disableBtn()}>
              LOGIN
            </button>
          </div>
          <div style={{ width: '100%', height: '30px' }}></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
