import { useContext, useState, useEffect } from 'react';
import './style.css';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import SelectProjectContext from '../../context/SelectProjectContext';
import InputField from '../../components/InputField';
import CheckBox from '../../components/CheckBox';
import { notification } from 'antd';
import { RightCircleOutlined, DownCircleOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import LocalStorageService from '../../services/localStorage';
import ModalAddList from '../../components/ModalAddList';

function Project() {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const selectProjectContext = useContext(SelectProjectContext);

  const [value, setValue] = useState({ user_role: 'TEAM_MEMBER' });
  const [validate, setValidate] = useState({ project_name: false, project_color: false });
  const [addFriend, setAddFriend] = useState([]);
  const [addProject, setAddProject] = useState(false);

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

  const selectProject = (ind) => {
    selectProjectContext.setProject(userContext.userProject.projectList[ind]);
    localStorage.setItem('IND', ind);
    localStorage.setItem('selectProject', JSON.stringify(userContext.userProject.projectList[ind]));
    history.push('/project');
  };

  const createProject = async () => {
    try {
      await axios.post('projects/createProject', { ...value, memberList: addFriend });
      const res1 = await axios.get('users/getProjectList');
      localStorage.setItem('userProject', JSON.stringify(res1.data.userProject));
      userContext.setUserProject(res1.data.userProject);
    } catch (err) {
      console.log(err);
    }
    setValue({ user_role: 'TEAM_MEMBER' });
    setValidate({ project_name: false });
    setAddFriend([]);
    setAddProject(false);
  };
  const back = () => {
    setValue({ user_role: 'TEAM_MEMBER' });
    setValidate({ project_name: false });
    setAddFriend([]);
    setAddProject(false);
  };

  return (
    <div className="page page-project" style={{ justifyContent: 'flex-start', padding: '10px' }}>
      {/* {addList ? <ModalAddList setAddList={setAddList} addList={addList} fetchProject={fetchProject} /> : null} */}

      <div className="card card-project">
        <div className="header-box" onClick={() => setAddProject(true)}>
          NEW PROJECT
          <span className="box--hover"> [ click to create new ] </span>
        </div>
        {addProject ? (
          <>
            <div className="list-block">
              <InputField
                name="project_name"
                label="PROJECT NAME:"
                type="text"
                getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                format="text"
                maxLength={50}
                minLength={3}
                need={true}
                width="80%"
                primaryColor={true}
              />
              <InputField
                name="description"
                label="DESCRIPTION:"
                type="text"
                getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                format="text"
                maxLength={500}
                width="80%"
                primaryColor={true}
              />
              <InputField
                name="project_deadline"
                label="DEADLINE:"
                type="date"
                getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                format="date"
                width="80%"
                primaryColor={true}
              />
              <InputField
                name="project_color"
                label="PROJECT COLOR:"
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
                name="user_role"
                boxWidth="80%"
                choiceWidth="40%"
                choice={[
                  { id: 'TEAM_MEMBER', label: 'TEAM MEMBER' },
                  { id: 'SUPERVISOR', label: 'SUPERVISOR' },
                ]}
                value={value}
                setValue={setValue}
                label="MY ROLE:"
                primaryColor={true}
              />
              <div style={{ color: 'var(--primary-color)', fontSize: '16px' }}>
                ADD PROJECT MEMBER
                <PlusCircleOutlined onClick={() => setAddFriend([...addFriend, { username: '' }])} />
              </div>

              {addFriend.map((friend, ind) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      width: '80%',
                    }}
                  >
                    <div className="input-field">
                      <input
                        className={'input-box input-box--primary'}
                        value={friend.username}
                        id={ind}
                        onChange={(e) => {
                          const newAddFriend = [...addFriend];
                          newAddFriend[ind].username = e.target.value;
                          setAddFriend(newAddFriend);
                        }}
                        type="text"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex' }}>
              <button className="btn-submit btn--primary" onClick={back} style={{ width: '40%' }}>
                - BACK -
              </button>
              <button
                className="btn-submit btn--primary"
                onClick={createProject}
                disabled={disableBtn()}
                style={{ width: '40%' }}
              >
                - CREATE -
              </button>
            </div>
          </>
        ) : null}
      </div>
      {userContext.userProject
        ? userContext.userProject.projectList.map((project, ind) => {
            const colorBorder = {
              borderColor: `${project.projectColor ? project.projectColor : 'var(--secondary-color)'}`,
            };
            const colorBackground = {
              backgroundColor: `${project.projectColor ? project.projectColor : 'var(--secondary-color)'}`,
            };
            const colorFont = {
              color: `${project.projectColor ? project.projectColor : 'var(--secondaryDarkest-color)'}`,
            };
            const antdBtn = {
              backgroundColor: 'white',
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              color: `${project.projectColor ? project.projectColor : 'var(--primaryDarkest-color)'}`,
            };

            const projectPercent = project.totalProjectScore
              ? `${((project.doneProjectScore / project.totalProjectScore) * 100).toFixed(0)}%`
              : '0%';
            const userPercent = project.totalUserScore
              ? `${((project.doneUserScore / project.totalUserScore) * 100).toFixed(0)}%`
              : '0%';
            return (
              <div
                className="card"
                style={{ ...colorBorder, width: '300px', maxWidth: '80%', cursor: 'pointer' }}
                onClick={() => selectProject(ind)}
              >
                <div className="header-box" style={{ ...colorBackground, textAlign: 'left' }}>
                  <span style={{ color: 'white', margin: '0px 5px' }}>{ind + 1}</span>
                  {')   ' + project.projectName}
                  <span className="box--hover"> [ PROJECT ID: {project.projectId} ] </span>
                </div>
                <div className="list-block" style={colorFont}>
                  <div className="list-todo" style={colorBorder}>
                    {project.description}
                  </div>
                  <div className="list-mark">
                    <div style={{ display: 'flex', color: project.projectColor }}>
                      <div>{projectPercent}</div>
                      <div
                        className="bar-project-percent-bg"
                        style={{ borderColor: project.projectColor, width: '80px' }}
                      >
                        <div
                          className="bar-project-percent"
                          style={{ backgroundColor: project.projectColor, width: projectPercent }}
                        ></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', color: userContext.user.userColor }}>
                      <div>{userPercent}</div>
                      <div
                        className="bar-project-percent-bg"
                        style={{
                          borderColor: userContext.user.userColor,
                          width: '80px',
                        }}
                      >
                        <div
                          className="bar-project-percent"
                          style={{ backgroundColor: userContext.user.userColor, width: userPercent }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Project;
