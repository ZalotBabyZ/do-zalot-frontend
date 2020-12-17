import { useContext, useState, useEffect } from 'react';
import './style.css';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import SelectProjectContext from '../../context/SelectProjectContext';
import HoverProjectContext from '../../context/HoverProjectContext';
import { notification } from 'antd';
import { QuestionOutlined, RightCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import LocalStorageService from '../../services/localStorage';

function Project() {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const hoverProjectContext = useContext(HoverProjectContext);
  const selectProjectContext = useContext(SelectProjectContext);

  const [user, setUser] = useState({});
  const [project, setProject] = useState({});
  const [teams, setTeams] = useState({});
  const [right, setRight] = useState({});
  const [boxes, setBoxes] = useState([]);

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

  return (
    <div className="page page-project" style={{}}>
      {boxes.map((box, ind) => {
        return (
          <div className="card card-box" style={{ borderColor: `${box.color ? box.color : 'var(--primary-color)'}` }}>
            <div
              className="header-box"
              style={{ backgroundColor: `${box.color ? box.color : 'var(--primary-color)'}` }}
            >
              {box.name}
              <span className="box--hover"> [ {box.description} ] </span>
            </div>
            {box.Lists.map((list) => {
              return (
                <div
                  className="list-block"
                  style={{ color: `${box.color ? box.color : 'var(--primaryDarkest-color)'}` }}
                >
                  <div className="list-todo">
                    <div className="list-action-icon">
                      <div className="list-action-icon--normal">
                        <RightCircleOutlined />
                      </div>
                      <div className="list-action-icon--hover">
                        <DownCircleOutlined />
                      </div>
                      <div
                        className="list-action"
                        style={{ borderColor: `${box.color ? box.color : 'var(--primary-color)'}` }}
                      >
                        123
                      </div>
                    </div>

                    {list.list}

                    <div className="list-description-icon">
                      <QuestionOutlined />
                      <div
                        className="list-description"
                        style={{ borderColor: `${box.color ? box.color : 'var(--primary-color)'}` }}
                      >
                        {list.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Project;
