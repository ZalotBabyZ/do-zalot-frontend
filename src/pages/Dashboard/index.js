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

      <div className="card card-project">
        <div className="header-box">
          NEW PROJECT
          <span className="box--hover"> [ ] </span>
        </div>
        <div className="list-block">No list here</div>
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

            const projectPrecent = project.totalProjectScore
              ? `${((project.doneProjectScore / project.totalProjectScore) * 100).toFixed(2)}%`
              : '0%';
            const userPrecent = project.totalUserScore
              ? `${((project.doneUserScore / project.totalUserScore) * 100).toFixed(2)}%`
              : '0%';
            return (
              <div className="card" style={{ ...colorBorder, width: '300px', maxWidth: '80%' }}>
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
                    <div style={{ display: 'flex' }}>
                      <div className="list-score" style={{ ...colorBackground, width: '40px' }}>
                        {projectPrecent}
                      </div>
                      <div className="list-deadline">{project.totalProjectScore}</div>
                    </div>
                    <div className="list-assign">{userPrecent}</div>
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
