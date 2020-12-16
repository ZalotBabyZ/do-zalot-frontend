import React from 'react';
import { useState } from 'react';
import InputField from '../../components/InputField';
import CheckBox from '../../components/CheckBox';
import './style.css';
import Validator, { ValidateEmail, isNumber } from '../../services/validation';

function Register() {
  const [value, setValue] = useState({});
  const [validate, setValidate] = useState({});

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
            name="ConfirmPassword"
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
            name="Email"
            label="อีเมล:"
            type="email"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            need={true}
            width="80%"
            primaryColor={true}
          />

          {!value.Email ? null : ValidateEmail(value.Email) ? null : (
            <div className="msg-alert">รูปแบบ email ไม่ถูกต้อง</div>
          )}

          <InputField
            name="PhoneNumber"
            label="เบอร์โทร:"
            type="tel"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="number"
            maxLength={10}
            minLength={9}
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
            need={true}
            primaryColor={true}
          />

          <div className="block-btn">
            <button className="btn-submit btn--primary"> REGISTER </button>
          </div>
          <div style={{ width: '100%', height: '30px' }}></div>
        </div>
        <div style={{ width: '100%', height: '30px' }}></div>
      </div>
    </div>
  );
}

export default Register;
