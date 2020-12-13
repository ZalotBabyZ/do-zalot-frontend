import React from 'react';
import { useState } from 'react';
import InputField from '../../components/InputField';
import './style.css';

function Login() {
  const [value, setValue] = useState({});
  const [validate, setValidate] = useState({});

  const valueGet = (fieldValue, field, isAlert) => {
    setValue({ ...value, [field]: fieldValue });
    isAlert ? setValidate({ ...validate, [field]: false }) : setValidate({ ...validate, [field]: true });
  };
  return (
    <div className="page">
      <div className="page-login">
        <div className="card card--primary card-login">
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
            <button className="btn-submit btn--primary"> LOGIN </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
