import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import CheckBox from './components/CheckBox';

function App() {
  const [value, setValue] = useState({});
  const [validate, setValidate] = useState({});

  const valueGet = (fieldValue, field, isAlert) => {
    setValue({ ...value, [field]: fieldValue });
    isAlert ? setValidate({ ...validate, [field]: false }) : setValidate({ ...validate, [field]: true });
  };

  return (
    <div className="App">
      <div className="card-submit">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <InputField
            name="PhoneNumber"
            label="เบอร์โทร"
            type="tel"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="number"
            maxLength={10}
            minLength={9}
            need={true}
            width="40%"
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
        </div>
        <button className="btn-submit"> ส่งข้อมูล </button>
      </div>
    </div>
  );
}

export default App;
