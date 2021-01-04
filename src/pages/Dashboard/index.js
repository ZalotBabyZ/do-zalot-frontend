import { useContext, useState, useEffect } from 'react';
import './style.css';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import SelectProjectContext from '../../context/SelectProjectContext';
import InputField from '../../components/InputField';
import CheckBox from '../../components/CheckBox';
import { notification } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
  TeamOutlined,
  FolderOpenOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

function Project() {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const selectProjectContext = useContext(SelectProjectContext);

  const [value, setValue] = useState({ user_role: 'TEAM_MEMBER' });
  const [validate, setValidate] = useState({ project_name: false, project_color: false });
  const [addFriend, setAddFriend] = useState([]);
  const [inviteList, setInviteList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [addProject, setAddProject] = useState(false);
  const [joinRequest, setJoinRequest] = useState(false);

  const fetchPendingList = async () => {
    try {
      const res = await axios.get(`projects/getPendingTeam`);
      setInviteList(res.data.inviteList);
      setRequestList(res.data.requestList);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProject = async () => {
    try {
      const res = await axios.get('users/getProjectList');
      localStorage.setItem('userProject', JSON.stringify(res.data.userProject));
      userContext.setUserProject(res.data.userProject);
      selectProjectContext.setProject(res.data.userProject.projectList[localStorage.getItem('IND')]);
      localStorage.setItem(
        'selectProject',
        JSON.stringify(res.data.userProject.projectList[localStorage.getItem('IND')])
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPendingList();
  }, []);

  const createProjectBtnDisable = () => {
    for (let key in validate) {
      if (key === 'project_id_request') continue;
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
      setValue({ user_role: 'TEAM_MEMBER' });
      setValidate({ project_name: false });
      setAddFriend([]);
      setAddProject(false);
    } catch (err) {
      console.log(err);
    }
  };

  const requestProject = async () => {
    try {
      await axios.post(`projects/requestProject/${value.project_id_request}`);
      fetchPendingList();
      notification.success({
        description: 'Already requested',
      });
    } catch (err) {
      console.log(err);
      notification.error({
        description: 'Request not success',
      });
    }
  };

  const createProjectBack = () => {
    setValue({ user_role: 'TEAM_MEMBER', project_id_request: value.project_id_request });
    setValidate({ project_name: false });
    setAddFriend([]);
    setAddProject(false);
  };
  const requestBack = () => {
    setValue({ ...value, project_id_request: null });
    setJoinRequest(false);
  };

  const acceptRequest = async (id) => {
    try {
      await axios.patch(`/projects/acceptTeamInvite/${id}`);
      fetchPendingList();
      fetchProject();
      notification.success({
        description: 'Already updated',
      });
    } catch (err) {
      console.log(err);
      notification.error({
        description: 'Update Not Success',
      });
    }
  };
  const rejectRequest = async (id) => {
    try {
      await axios.delete(`/projects/rejectTeamInvite/${id}`);
      fetchPendingList();
      fetchProject();
      notification.success({
        description: 'Already rejected',
      });
    } catch (err) {
      console.log(err);
      notification.error({
        description: 'Reject Not Success',
      });
    }
  };

  const btnPending = {
    backgroundColor: `${userContext.user ? userContext.user.userColor : null}`,
    width: '40%',
    fontSize: '12px',
    boxShadow: `3px 3px 2px ${userContext.user ? userContext.user.userColor : null}`,
  };
  const projectListCover = {
    borderColor: `${userContext.user ? userContext.user.userColor : 'var(--primary-color)'}`,
    borderTopWidth: '0px',
    textAlign: 'left',
  };
  const projectList = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    width: '20%',
    fontSize: '25px',
  };
  return (
    <div className="page page-project" style={{ justifyContent: 'flex-start', padding: '10px' }}>
      {/* {addList ? <ModalAddList setAddList={setAddList} addList={addList} fetchProject={fetchProject} /> : null} */}

      <div className="card card-project">
        <div className="header-box" style={{ textAlign: 'left', backgroundColor: 'var(--primary-color)' }}>
          &nbsp;
          <PlusCircleOutlined onClick={() => setAddProject(true)} /> NEW PROJECT
          <span className="box--hover"> [ click + to add new ] </span>
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
              <button className="btn-submit btn--primary" onClick={createProjectBack} style={{ width: '40%' }}>
                - BACK -
              </button>
              <button
                className="btn-submit btn--primary"
                onClick={createProject}
                disabled={createProjectBtnDisable()}
                style={{ width: '40%' }}
              >
                - CREATE -
              </button>
            </div>
          </>
        ) : (
          <div className="list-block" style={{ color: 'var(--primary-color)' }}>
            <div className="list-todo" style={{ borderColor: 'var(--primary-color)', flexDirection: 'column' }}>
              <p>
                คลิ๊ก <PlusCircleOutlined onClick={() => setAddProject(true)} /> เพื่อเพิ่ม project ใหม่
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        className="card card-project"
        style={{
          borderColor: `${userContext.user ? userContext.user.userColor : 'var(--primary-color)'}`,
        }}
      >
        <div
          className="header-box"
          style={{
            textAlign: 'left',
            backgroundColor: `${userContext.user ? userContext.user.userColor : 'var(--primary-color)'}`,
          }}
        >
          &nbsp;
          <TeamOutlined onClick={() => setJoinRequest(true)} /> PENDING LIST
          <span className="box--hover"> [ invited / ask to join] </span>
        </div>
        {joinRequest ? (
          <>
            <InputField
              name="project_id_request"
              label="PROJECT ID:"
              type="number"
              getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
              format="number"
              minValue="0"
              width="80%"
            />
            <div style={{ display: 'flex' }}>
              <button className="btn-submit btn--primary" onClick={requestBack} style={btnPending}>
                - BACK -
              </button>
              <button
                className="btn-submit btn--primary"
                onClick={requestProject}
                disabled={!value.project_id_request}
                style={btnPending}
              >
                -REQUEST-
              </button>
            </div>
          </>
        ) : (
          <div
            className="list-block"
            style={{ color: `${userContext.user ? userContext.user.userColor : 'var(--primary-color)'}` }}
          >
            <div
              className="list-todo"
              style={{
                borderColor: `${userContext.user ? userContext.user.userColor : 'var(--primary-color)'}`,
                flexDirection: 'column',
              }}
            >
              {inviteList.length === 0 ? (
                <p> ไม่มี โปรเจคที่ถูกเชิญ ค้างอยู่</p>
              ) : (
                inviteList.map((item, ind) => {
                  return (
                    <div key={ind} className="list-todo" style={projectListCover}>
                      <div style={{ width: '80%' }}>
                        <p>PROJECT: {item.Project.name}</p>
                        <p style={{ fontSize: '10px' }}>
                          <CalendarOutlined /> request date: {item.created_at.slice(0, 10)}
                        </p>
                      </div>
                      <div style={projectList}>
                        <CheckCircleOutlined onClick={() => acceptRequest(item.id)} />
                        <CloseCircleOutlined onClick={() => rejectRequest(item.id)} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div
              className="list-todo"
              style={{
                borderColor: `${userContext.user ? userContext.user.userColor : 'var(--primary-color)'}`,
                flexDirection: 'column',
                borderTopWidth: '0px',
              }}
            >
              {requestList.length === 0 ? (
                <p>ไม่มี โปรเจคที่ขอเข้าร่วม ค้างอยู่</p>
              ) : (
                requestList.map((item, ind) => {
                  return (
                    <div key={ind} className="list-todo" style={projectListCover}>
                      <div style={{ width: '80%' }}>
                        <p>PROJECT: {item.Project.name}</p>
                        <p style={{ fontSize: '10px' }}>
                          <CalendarOutlined /> request date: {item.created_at.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <p>
              คลิ๊ก <TeamOutlined onClick={() => setJoinRequest(true)} /> เพื่อส่งคำขอเข้าร่วม project
            </p>
          </div>
        )}
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
                  <span style={{ color: 'white', margin: '0px 5px' }}>
                    &nbsp;
                    <FolderOpenOutlined />-{ind + 1}
                  </span>
                  {project.projectName}
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
                    <div
                      style={{
                        display: 'flex',
                        color: `${userContext.user ? userContext.user.userColor : 'var(--primary-color)'}`,
                      }}
                    >
                      <div>{userPercent}</div>
                      <div
                        className="bar-project-percent-bg"
                        style={{
                          borderColor: `${userContext.user ? userContext.user.userColor : 'var(--primary-color)'}`,
                          width: '80px',
                        }}
                      >
                        <div
                          className="bar-project-percent"
                          style={{
                            backgroundColor: `${
                              userContext.user ? userContext.user.userColor : 'var(--primary-color)'
                            }`,
                            width: userPercent,
                          }}
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
