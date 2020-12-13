import React from 'react';
import { useState } from 'react';
import InputField from '../../components/InputField';
import CheckBox from '../../components/CheckBox';
import './style.css';

function Login() {
  const [value, setValue] = useState({});
  const [validate, setValidate] = useState({});

  const valueGet = (fieldValue, field, isAlert) => {
    setValue({ ...value, [field]: fieldValue });
    isAlert ? setValidate({ ...validate, [field]: false }) : setValidate({ ...validate, [field]: true });
  };
  return (
    <div className="page page-top-plus">
      <div className="page-register">
        <div className="card card-register">
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
          />
          <InputField
            name="ConfirmPassword"
            label="ConfirmPassword:"
            type="text"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            minLength={8}
            need={true}
            width="80%"
          />
          <InputField
            name="PhoneNumber"
            label="เบอร์โทร"
            type="tel"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="number"
            maxLength={10}
            minLength={9}
            need={true}
            width="80%"
          />
          <CheckBox
            type="radio"
            name="gender"
            boxWidth="40%"
            choiceWidth="40%"
            choice={[
              { id: 'male', label: 'ชาย' },
              { id: 'female', label: 'หญิง' },
            ]}
            value={value}
            setValue={setValue}
            label="เพศ"
          />

          <div className="block-btn">
            <button className="btn-submit"> REGISTER </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
