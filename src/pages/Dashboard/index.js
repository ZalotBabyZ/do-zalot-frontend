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
import ModalAddList from '../../components/ModalAddList';

function Project() {
  const history = useHistory();
  const userContext = useContext(UserContext);

  return (
    <div className="page page-project" style={{ justifyContent: 'flex-start', padding: '10px' }}>
      {/* {addList ? <ModalAddList setAddList={setAddList} addList={addList} fetchProject={fetchProject} /> : null} */}

      {userContext.userProject
        ? userContext.userProject.projectList.map((project) => {
            const colorBorder = { borderColor: `${project.color ? project.color : 'var(--primary-color)'}` };
            const colorBackground = { backgroundColor: `${project.color ? project.color : 'var(--primary-color)'}` };
            const colorFont = { color: `${project.color ? project.color : 'var(--primaryDarkest-color)'}` };
            const antdBtn = {
              backgroundColor: 'white',
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              color: `${project.color ? project.color : 'var(--primaryDarkest-color)'}`,
            };

            return (
              <div className="card card-project" style={colorBorder}>
                <div className="header-box" style={colorBackground}>
                  {project.projectName}
                  <span className="box--hover"> [ ] </span>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Project;
