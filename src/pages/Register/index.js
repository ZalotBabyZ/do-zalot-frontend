import React from 'react';
import { useState, useEffect } from 'react';
import InputField from '../../components/InputField';
import CheckBox from '../../components/CheckBox';
import './style.css';
import { ValidateEmail } from '../../services/validation';

function Register() {
  const [value, setValue] = useState({});
  const [validate, setValidate] = useState({
    user_color: false,
    email: false,
    confirmPassword: false,
    password: false,
    lastname: false,
    firstname: false,
    username: false,
    passwordConfirm: false,
  });

  const disableBtn = () => {
    for (let key in validate) {
      if (!validate[key]) return true;
    }
    return false;
  };

  useEffect(() => {
    setValidate({ ...validate, passwordConfirm: value.confirmPassword === value.password });
  }, [value.password, value.confirmPassword]);

  useEffect(() => {
    setValidate({ ...validate, email: ValidateEmail(value.email) });
  }, [value.email]);

  const valueGet = (fieldValue, field, isAlert) => {
    setValue({ ...value, [field]: fieldValue });
    isAlert ? setValidate({ ...validate, [field]: false }) : setValidate({ ...validate, [field]: true });
  };

  return (
    <div className="page">
      <div className="page-register" style={{ minHeight: '85vh' }}>
        <div style={{ width: '100%', height: '30px' }}></div>
        <div className="card card--primary card-register">
          <div style={{ width: '100%', height: '30px' }}></div>
          <InputField
            name="username"
            label="ชื่อผู้ใช้:"
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
            label="รหัสผ่าน:"
            type="text"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            minLength={8}
            need={true}
            width="80%"
            primaryColor={true}
          />
          <InputField
            name="confirmPassword"
            label="กรอกรหัสผ่านอีกครั้ง:"
            type="text"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            minLength={8}
            need={true}
            width="80%"
            primaryColor={true}
          />
          <InputField
            name="firstname"
            label="ชื่อ:"
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
            name="lastname"
            label="นามสกุล:"
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
            name="email"
            label="อีเมล:"
            type="email"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            need={true}
            width="80%"
            primaryColor={true}
          />

          {!value.email ? null : ValidateEmail(value.email) ? null : (
            <div className="msg-alert">รูปแบบ email ไม่ถูกต้อง</div>
          )}

          <InputField
            name="user_color"
            label="สีประจำตัว:"
            type="color"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            maxLength={7}
            minLength={7}
            need={true}
            width="80%"
            primaryColor={true}
          />

          <CheckBox
            type="radio"
            name="gender"
            boxWidth="80%"
            choiceWidth="40%"
            choice={[
              { id: 'male', label: 'ชาย' },
              { id: 'female', label: 'หญิง' },
            ]}
            value={value}
            setValue={setValue}
            label="เพศ"
            primaryColor={true}
          />

          <div className="block-btn">
            <button className="btn-submit btn--primary" disabled={disableBtn()}>
              REGISTER
            </button>
          </div>
          <div style={{ width: '100%', height: '30px' }}></div>
        </div>
        <div style={{ width: '100%', height: '30px' }}></div>
      </div>
    </div>
  );
}

export default Register;
