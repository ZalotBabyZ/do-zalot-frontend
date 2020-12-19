import { useState } from 'react';
import InputField from '../../components/InputField';
import CheckBox from '../../components/CheckBox';

function ModalAddList({ setAddList, addList }) {
  const [value, setValue] = useState({ pin: 'notPin', score: 1 });
  const [validate, setValidate] = useState({});

  const valueGet = (fieldValue, field, isAlert) => {
    setValue({ ...value, [field]: fieldValue });
    isAlert ? setValidate({ ...validate, [field]: false }) : setValidate({ ...validate, [field]: true });
  };
  return (
    <div>
      <div className="modal">
        <div className="modal-header">New List: {addList.box_name}</div>
        <div className="modal-body">
          <InputField
            name="list"
            label="NEW LIST:"
            type="text"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            maxLength={128}
            minLength={1}
            need={true}
            width="80%"
            primaryColor={true}
          />
          <InputField
            name="description"
            label="NOTE:"
            type="text"
            getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
            format="text"
            maxLength={500}
            width="80%"
            primaryColor={true}
          />
          {addList.type === 'TODO' ? (
            <div style={{ padding: '0px 3% 0px 5.6%', display: 'flex', justifyContent: 'space-between', width: '80%' }}>
              <InputField
                name="score"
                defaultValue={1}
                label="SCORE:"
                type="number"
                getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                format="number"
                minValue={addList.type === 'TODO' ? '0' : 0}
                width="30%"
                allowLessWidth={true}
                need={addList.type === 'TODO'}
                primaryColor={true}
              />
              <InputField
                name="list_deadline"
                defaultValue={addList.deadline}
                label="DEADLINE:"
                type="date"
                getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                format="text"
                width="70%"
                allowLessWidth={true}
                primaryColor={true}
                need={true}
              />
            </div>
          ) : null}
          <CheckBox
            type="radio"
            name="pin"
            boxWidth="80%"
            choiceWidth="25%"
            choice={[
              { id: 'pinTop', label: 'PIN TOP' },
              { id: 'pinBottom', label: 'PIN BOTTOM' },
              { id: 'notPin', label: 'NOT PIN' },
            ]}
            value={value}
            setValue={setValue}
            label="PIN THIS PROJECT?"
            need={true}
            primaryColor={true}
          />
        </div>
        <div className="modal-footer">
          <button
            className="btn-submit btn--primary btn-submit-modal"
            onClick={() => {
              setAddList(null);
            }}
          >
            BACK
          </button>
          <button className="btn-submit btn--primary btn-submit-modal"> SAVE </button>
        </div>
      </div>
      <div className="modal-wrap"></div>
    </div>
  );
}

export default ModalAddList;
