import React, { useState, useEffect } from 'react';
import './style.css';

function InputField(props) {
  const { name, type, label, getValue } = props;

  const [value, setValue] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    let msg = '';
    if (value) {
      let pre = '';
      if (props.format) {
        if (props.format === 'number') {
          msg += isNaN(value) ? 'ต้องเป็นตัวเลขเท่านั้น' : '';
        }
      }
      if (props.minLength) {
        pre = msg ? ' และ' : '';
        msg += value.length < props.minLength ? `${pre}ต้องไม่ต่ำกว่า ${props.minLength} ตัวอักษร` : '';
      }
      if (props.maxLength) {
        pre = msg ? ' และ' : '';
        msg += value.length > props.maxLength ? `${pre}ต้องไม่เกิน ${props.maxLength} ตัวอักษร` : '';
      }
    } else {
      props.need ? (msg = 'คุณต้องกรอกช่องนี้') : (msg = '');
    }
    setAlertMsg(msg);
    getValue(value, name, msg);
  }, [value]);

  useEffect(() => {
    if (props.clear === true) setValue('');
  }, [props.clear]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: props.width,
        minWidth: '187px',
      }}
    >
      <div className="input-field">
        <label className={`input-label ${props.primaryColor ? 'input-label--primary' : null}`} for={name}>
          {label}
        </label>
        <input
          className={`input-box ${props.primaryColor ? 'input-box--primary' : null} ${
            value && !alertMsg ? 'input-value--validated' : value && alertMsg ? 'input-value--alert' : null
          }`}
          value={value}
          id={name}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type={type}
        />
        {alertMsg ? <p className="msg-alert"> {alertMsg}</p> : null}
      </div>
    </div>
  );
}

export default InputField;
