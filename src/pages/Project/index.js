import { useContext, useState, useEffect } from 'react';
import './style.css';
import axios from '../../config/axios';
import UserContext from '../../context/UserContext';
import SelectProjectContext from '../../context/SelectProjectContext';
import { notification } from 'antd';
import {
  QuestionOutlined,
  RightCircleOutlined,
  DownCircleOutlined,
  EditOutlined,
  CommentOutlined,
  PlusCircleOutlined,
  TeamOutlined,
  CalendarOutlined,
  MehOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import ModalAddList from '../../components/ModalAddList';
import ModalEditList from '../../components/ModalEditList';

function Project() {
  const { setUserProject } = useContext(UserContext);
  const selectProjectContext = useContext(SelectProjectContext);

  const [user, setUser] = useState({});
  const [requestList, setRequestList] = useState([]);
  const [project, setProject] = useState({});
  const [teams, setTeams] = useState([]);
  const [right, setRight] = useState({});
  const [boxes, setBoxes] = useState([]);
  const [addList, setAddList] = useState(null);
  const [editList, setEditList] = useState(null);

  const status = ['TODO', 'DOING', 'DONE'];
  const fetchProject = async () => {
    try {
      const res = await axios.get(`projects/getProject?projectId=${selectProjectContext.project.projectId}`);
      setBoxes(res.data.boxes);
      setUser(res.data.user);
      setTeams(res.data.teams);
      setProject(res.data.project);
      setRight(res.data.right);
      const res1 = await axios.get('users/getProjectList');
      localStorage.setItem('userProject', JSON.stringify(res1.data.userProject));
      setUserProject(res1.data.userProject);
      selectProjectContext.setProject(res1.data.userProject.projectList[localStorage.getItem('IND')]);
      localStorage.setItem(
        'selectProject',
        JSON.stringify(res1.data.userProject.projectList[localStorage.getItem('IND')])
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`projects/getTeamRequest/${selectProjectContext.project.projectId}`);
      setRequestList(res.data.requestList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectProjectContext.project.projectId]);
  useEffect(() => {
    fetchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectProjectContext.project.projectId]);

  const setListStatus = (listId, status, newBoxId) => {
    axios
      .patch('todos/updateStatus', { listId, status, newBoxId })
      .then((res) => {
        notification.success({
          description: 'Already updated',
        });
        fetchProject();
        console.log(boxes);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: 'Update Not Success',
        });
      });
  };

  const onAddList = (project_id, box_id, box_name, boxType) => {
    const type = ['TODO', 'DOING', 'DONE'].includes(boxType) ? 'TODO' : boxType;
    const status = ['TODO', 'DOING', 'DONE'].includes(boxType) ? boxType : 'NOTHING';
    setAddList({ project_id, box_name, box_id, type, status, deadline: project.deadline });
  };
  const onEditList = (id) => {
    setEditList({ id });
  };

  const acceptRequest = (teamId, projectId) => {
    axios
      .patch(`projects/acceptTeamRequest/${teamId}/${projectId}`)
      .then((res) => {
        notification.success({
          description: 'Already updated',
        });
        fetchRequest();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: 'Update Not Success',
        });
      });
  };

  const rejectRequest = (teamId, projectId) => {
    axios
      .delete(`projects/rejectTeamRequest/${teamId}/${projectId}`)
      .then((res) => {
        notification.success({
          description: 'Already updated',
        });
        fetchRequest();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: 'Update Not Success',
        });
      });
  };

  return (
    <div className="page page-project" style={{ justifyContent: 'flex-start', padding: '10px' }}>
      {addList ? <ModalAddList setAddList={setAddList} addList={addList} fetchProject={fetchProject} /> : null}
      {editList ? (
        <ModalEditList setEditList={setEditList} editList={editList} teams={teams} fetchProject={fetchProject} />
      ) : null}

      <div className="card card-project" style={{ borderColor: selectProjectContext.project.projectColor }}>
        <div
          className="header-box"
          style={{ backgroundColor: selectProjectContext.project.projectColor, textAlign: 'left' }}
        >
          &nbsp;
          <TeamOutlined /> PROJECT REQUEST CARD
          <span className="box--hover"> [ pending ] </span>
        </div>

        <div className="list-block" style={{ color: selectProjectContext.project.projectColor }}>
          <div
            className="list-todo"
            style={{
              borderColor: selectProjectContext.project.projectColor,
              flexDirection: 'column',
            }}
          >
            {requestList.length === 0 ? (
              <p style={{ width: '100%', textAlign: 'left' }}>
                <MehOutlined />
                &nbsp;&nbsp;&nbsp; No Request to join.
              </p>
            ) : (
              requestList.map((item, ind) => {
                return (
                  <div key={ind} className="list-todo">
                    <div style={{ width: '80%' }}>
                      <p> USERNAME: {item.User.username} </p>
                      <p style={{ fontSize: '10px' }}>
                        <CalendarOutlined /> request date: {item.created_at.slice(0, 10)}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'flex-end',
                        height: '100%',
                        width: '20%',
                        fontSize: '25px',
                      }}
                    >
                      <CheckCircleOutlined
                        onClick={() => acceptRequest(item.id, selectProjectContext.project.projectId)}
                      />
                      <CloseCircleOutlined
                        onClick={() => rejectRequest(item.id, selectProjectContext.project.projectId)}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div
            className="list-todo"
            style={{
              borderColor: selectProjectContext.project.projectColor,
              flexDirection: 'column',
              borderTopWidth: '0px',
            }}
          ></div>
        </div>
      </div>

      {/* box list cards */}
      {boxes.map((box, boxInd) => {
        const colorBorder = { borderColor: `${box.color ? box.color : 'var(--primary-color)'}` };
        const colorBackground = { backgroundColor: `${box.color ? box.color : 'var(--primary-color)'}` };
        const colorFont = { color: `${box.color ? box.color : 'var(--primaryDarkest-color)'}` };
        const antdBtn = {
          backgroundColor: 'white',
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          color: `${box.color ? box.color : 'var(--primaryDarkest-color)'}`,
        };

        return (
          <div className="card card-box" style={colorBorder} key={boxInd}>
            <div className="header-box" style={colorBackground}>
              {box.box_name}
              <span className="box--hover"> [ {box.type} ] </span>
            </div>
            {box.Lists.length === 0 ? (
              <div className="list-block" style={colorFont}>
                No list here
              </div>
            ) : (
              box.Lists.map((list, listInd) => {
                return (
                  <div className="list-block" style={colorFont} key={listInd}>
                    <div className="list-todo" style={colorBorder}>
                      <div className="list-action-icon">
                        <div className="list-action-icon--normal">
                          <RightCircleOutlined />
                        </div>
                        <div className="list-action-icon--hover">
                          <DownCircleOutlined />
                        </div>
                        <div className="list-action" style={colorBackground}>
                          {box.type === 'NOTE'
                            ? null
                            : status.map((choice, indChoice) => {
                                const statusButton = {
                                  color: `${box.color ? box.color : 'var(--secondaryDarkest-color)'}`,
                                };
                                return project.box && project.box[choice][0] ? (
                                  project.box && project.box[choice][1] ? (
                                    <button className="list-status" style={statusButton} key={indChoice}>
                                      {choice}
                                      <div className="status-choice">
                                        {project.box && project.box[choice][1]
                                          ? project.box[choice].map((todoStatus, ind) =>
                                              todoStatus.name !== box.box_name ? (
                                                <div
                                                  className="status-choice"
                                                  onClick={() => setListStatus(list.id, choice, todoStatus.id)}
                                                  key={ind}
                                                >
                                                  {todoStatus.name}
                                                </div>
                                              ) : null
                                            )
                                          : null}
                                      </div>
                                    </button>
                                  ) : choice !== box.type ? (
                                    <button
                                      key={indChoice}
                                      className="list-status"
                                      style={statusButton}
                                      onClick={() => setListStatus(list.id, choice, project.box[choice][0].id)}
                                    >
                                      {choice}
                                    </button>
                                  ) : (
                                    <button
                                      key={indChoice}
                                      className="list-status"
                                      style={{ backgroundColor: 'grey', color: 'white', opacity: 0.2 }}
                                      disabled={true}
                                    >
                                      {choice}
                                    </button>
                                  )
                                ) : null;
                              })}
                          <button
                            className="list-status"
                            style={{
                              borderColor: `${box.color ? box.color : 'var(--secondaryDarkest-color)'}`,
                              color: `${box.color ? box.color : 'var(--secondaryDarkest-color)'}`,
                            }}
                            onClick={() => onEditList(list.id)}
                          >
                            <EditOutlined />
                          </button>
                        </div>
                      </div>
                      <div style={{ width: '85%', textAlign: 'left' }}>{list.list}</div>
                      <div className="list-description-icon">
                        <QuestionOutlined />
                        <div className="list-description" style={colorBorder}>
                          {list.type === 'PICTURE' ? (
                            <img src={list.description} alt={list.list} style={{ width: '95%' }} />
                          ) : (
                            list.description
                          )}
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '10px',
                              width: '95%',
                              borderTop: `2px ${box.color ? box.color : 'var(--primary-color)'} dashed`,
                            }}
                          >
                            {list.Comments.length !== 0
                              ? 'Last update: ' +
                                list.Comments.map((comment) => comment.updatedAt).reduce(function (a, b) {
                                  return a > b ? a : b;
                                })
                              : 'No comment'}
                            <div onClick={() => onEditList(list.id)}>
                              <CommentOutlined /> {list.Comments.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-mark">
                      {box.type === 'NOTE' ? (
                        list.type === 'PICTURE' ? (
                          <img src={list.description} alt={list.list} style={{ width: '100%' }} />
                        ) : (
                          list.description
                        )
                      ) : (
                        <div style={{ display: 'flex' }}>
                          <div className="list-score" style={colorBackground}>
                            {list.score}
                          </div>
                          <div className="list-deadline">
                            {list.listDeadline ? list.listDeadline : project.deadline}
                          </div>
                        </div>
                      )}
                      <div className="list-assign">
                        {list.Assigns
                          ? list.Assigns.map((user, ind) => {
                              const targetUser = teams.filter((member) => member.id === user.id)[0];
                              return user.userStatus === 'UNDERTAKE' && targetUser ? (
                                <img
                                  src={targetUser.User.image}
                                  style={{ border: `2px solid ${targetUser.User.color}` }}
                                  key={ind}
                                  alt="user"
                                />
                              ) : null;
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div className="footer-box" style={colorBackground}>
              {box.description}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '60px' }}>
                <div
                  style={antdBtn}
                  onClick={() => onAddList(selectProjectContext.project.projectId, box.id, box.box_name, box.type)}
                >
                  <PlusCircleOutlined />
                </div>
                <div style={antdBtn}>
                  <EditOutlined />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Project;
