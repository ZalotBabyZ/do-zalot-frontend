import { useContext, useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import SelectProjectContext from '../../context/SelectProjectContext';
import HoverProjectContext from '../../context/HoverProjectContext';
import { notification } from 'antd';
import LocalStorageService from '../../services/localStorage';

function NavProject() {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const hoverProjectContext = useContext(HoverProjectContext);
  const selectProjectContext = useContext(SelectProjectContext);
  // const position = window.innerWidth <= 500 ? 'top' : 'side';

  const selectProject = (ind) => {
    selectProjectContext.setProject(userContext.userProject.projectList[ind]);
    localStorage.setItem('selectProject', JSON.stringify(userContext.userProject.projectList[ind]));
    history.push('/project');
  };

  // const top =
  // console.log(window.innerHeight);
  // console.log(userContext.userProject.projectCount);

  return (
    <div className="nav-project">
      {userContext.userProject
        ? userContext.userProject.projectList.map((project, ind) => {
            return (
              <div
                className="nav-item"
                onClick={() => selectProject(ind)}
                onMouseOver={() => hoverProjectContext.setProject(userContext.userProject.projectList[ind])}
                onMouseLeave={() => hoverProjectContext.setProject(0)}
              >
                {ind + 1}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default NavProject;
