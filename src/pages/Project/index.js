import { useContext, useState, useEffect } from 'react';
import './style.css';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import SelectProjectContext from '../../context/SelectProjectContext';
import HoverProjectContext from '../../context/HoverProjectContext';
import { notification } from 'antd';
import {
  QuestionOutlined,
  RightCircleOutlined,
  DownCircleOutlined,
  EditOutlined,
  CommentOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import LocalStorageService from '../../services/localStorage';

function Project() {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const hoverProjectContext = useContext(HoverProjectContext);
  const selectProjectContext = useContext(SelectProjectContext);

  const [user, setUser] = useState({});
  const [project, setProject] = useState({});
  const [teams, setTeams] = useState([]);
  const [right, setRight] = useState({});
  const [boxes, setBoxes] = useState([]);

  const status = ['TODO', 'DOING', 'DONE'];

  useEffect(() => {
    axios
      .get(`projects/getProject?projectId=${selectProjectContext.project.projectId}`)
      .then((res) => {
        notification.success({
          description: selectProjectContext.project.projectName,
        });
        let projectBox = res.data.boxes;

        projectBox = projectBox.sort(function (a, b) {
          return a.order - b.order;
        });
        projectBox = projectBox.sort(function (b, a) {
          return a.projectPin - b.projectPin;
        });

        setBoxes(projectBox);
        setUser(res.data.user);
        setTeams(res.data.teams);
        setProject(res.data.project);
        setRight(res.data.right);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectProjectContext.project.projectId]);

  const setListStatus = (listId, status) => {
    alert(listId + status);
    //ส่ง listId  ไป backend patch
  };
  return (
    <div className="page page-project" style={{ justifyContent: 'flex-start', padding: '10px' }}>
      {boxes.map((box, ind) => {
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
          <div className="card card-box" style={colorBorder}>
            <div className="header-box" style={colorBackground}>
              {box.name}
              <span className="box--hover"> [ {box.type} ] </span>
            </div>
            {box.Lists.length === 0 ? (
              <div className="list-block" style={colorFont}>
                No list here
              </div>
            ) : (
              box.Lists.map((list) => {
                return (
                  <div className="list-block" style={colorFont}>
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
                            : status.map((status) => {
                                return (
                                  <button
                                    className="list-status"
                                    style={{
                                      color: `${box.color ? box.color : 'var(--secondaryDarkest-color)'}`,
                                    }}
                                    onClick={() => setListStatus(list.id, status)}
                                  >
                                    {status}
                                  </button>
                                );
                              })}
                          <button
                            className="list-status"
                            style={{
                              borderColor: `${box.color ? box.color : 'var(--secondaryDarkest-color)'}`,
                              color: `${box.color ? box.color : 'var(--secondaryDarkest-color)'}`,
                            }}
                          >
                            <EditOutlined />
                          </button>
                        </div>
                      </div>
                      <div>{list.list}</div>
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
                            <div>
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
                          ? list.Assigns.map((user) => {
                              console.log(user.userStatus);
                              // console.log(teams.filter((member) => member.id === user.id)[0].id);
                              const targetUser = teams.filter((member) => member.id === user.id)[0];
                              return user.userStatus === 'UNDERTAKE' && targetUser ? (
                                <img
                                  src={targetUser.User.image}
                                  style={{ border: `2px solid ${targetUser.User.color}` }}
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
                <div style={antdBtn}>
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
