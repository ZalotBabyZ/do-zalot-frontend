import './style.css';
import React, { useState, useEffect } from 'react';

function CheckBox(props) {
  const choice = props.choice ? props.choice : null;

  useEffect(() => {
    if (choice && props.type === 'checkbox') {
      let initCbValue = {};
      choice.forEach((item) => (initCbValue = { ...initCbValue, [item.id]: false }));
      props.setValue({ ...props.value, [props.name]: initCbValue });
    }
  }, []);

  return (
    <div
      style={{
        width: props.boxWidth,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '187px',
      }}
    >
      <div
        style={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {props.label ? (
          <div className={`checkBox-label ${props.primaryColor ? 'checkBox-label--primary' : null}`}>{props.label}</div>
        ) : null}
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
          {props.type === 'radio' ? (
            choice.map((item) => {
              return (
                <label
                  className={`checked-container ${props.primaryColor ? 'checked-container--primary' : null}`}
                  for={item.id}
                  style={{ width: props.choiceWidth }}
                >
                  <input
                    className="checked-inputCheckbox"
                    id={item.id}
                    type={props.type}
                    name={props.name}
                    checked={props.value[props.name] === item.id}
                    onChange={(e) => props.setValue({ ...props.value, [props.name]: item.id })}
                  />
                  <span className={`checkmark ${props.primaryColor ? 'checkmark--primary' : null}`}></span>
                  <span className="checked-label"> {item.label} </span>
                </label>
              );
            })
          ) : props.choice ? (
            choice.map((item) => {
              return (
                <label className="checked-container" for={item.id} style={{ width: props.width }}>
                  <input
                    className="checked-inputCheckbox"
                    id={item.id}
                    type={props.type}
                    name={props.name}
                    onChange={(e) =>
                      props.setValue({
                        ...props.value,
                        [props.name]: {
                          ...props.value[props.name],
                          [item.id]: e.target.checked,
                        },
                      })
                    }
                  />
                  <span className="checkmark"></span>
                  <span className="checked-label"> {item.label} </span>
                </label>
              );
            })
          ) : (
            <label className="checked-container" for={props.name} style={{ width: props.width }}>
              <input
                className="checked-inputCheckbox"
                id={props.name}
                type={props.type}
                checked={props.value[props.name]}
                onChange={(e) => props.setValue({ ...props.value, [props.name]: e.target.checked })}
              />
              <span className="checkmark"></span>
              <span className="checked-label"> {props.label} </span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckBox;
