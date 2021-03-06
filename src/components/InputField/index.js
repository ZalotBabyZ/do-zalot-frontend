import React, { useState, useEffect } from 'react';
import './style.css';

function InputField(props) {
  const { name, type, label, getValue } = props;
  const defaultValue = props.defaultValue ? props.defaultValue : '';
  const [value, setValue] = useState(defaultValue);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    let msg = '';
    if (value) {
      let pre = '';
      if (props.format) {
        if (props.format === 'number') {
          msg += isNaN(value) ? 'Nmber only' : '';
        }
      }
      if (props.minLength) {
        pre = msg ? ' ,' : '';
        msg += value.length < props.minLength ? `${pre} Minimun  ${props.minLength} chars` : '';
      }
      if (props.maxLength) {
        pre = msg ? ' ,' : '';
        msg += value.length > props.maxLength ? `${pre} Maximum ${props.maxLength} chars` : '';
      }
      if (props.minValue) {
        pre = msg ? ' ,' : '';
        msg += +value < props.minValue ? `${pre} Minimum value is ${props.minValue}` : '';
      }
    } else {
      msg = props.need ? 'Require this field' : (msg = '');
    }
    setAlertMsg(msg + '.');
    getValue(value, name, msg);
    // eslint-disable-next-line
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
        minWidth: `${props.allowLessWidth ? props.width : '187px'}`,
      }}
    >
      <div className="input-field">
        <label className={`input-label ${props.primaryColor ? 'input-label--primary' : null}`} htmlFor={name}>
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
          autoComplete="on"
        />
        {alertMsg ? <p className="msg-alert"> {alertMsg}</p> : null}
      </div>
    </div>
  );
}

export default InputField;
