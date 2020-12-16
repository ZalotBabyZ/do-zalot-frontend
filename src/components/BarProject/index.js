import { useState, useContext, useEffect } from 'react';
import './style.css';
import SelectProjectContext from '../../context/SelectProjectContext';
import HoverProjectContext from '../../context/HoverProjectContext';

function BarProject(props) {
  const selectProjectContext = useContext(SelectProjectContext);
  const hoverProjectContext = useContext(HoverProjectContext);
  //เดี๋ยวอันนี้รอข้อมูลจากbackend ลบ แล้วใช้แค่ props.xxx ไม่มีค่าdefault
  const initProjPercent = selectProjectContext.project
    ? selectProjectContext.project.totalProjectScore === 0
      ? 0
      : (selectProjectContext.project.doneProjectScore / selectProjectContext.project.totalProjectScore) * 100
    : '';
  const initUserPercent = selectProjectContext.project
    ? selectProjectContext.project.totalUserScore === 0
      ? 0
      : (selectProjectContext.project.doneUserScore / selectProjectContext.project.totalUserScore) * 100
    : '';
  const projectColor = props.projectColor ? props.projectColor : 'var(--thirdary-color)';
  const userColor = props.userColor ? props.userColor : 'var(--secondary-color)';
  const initProjectName = selectProjectContext.project
    ? selectProjectContext.project.project_name
    : 'ยังไม่ได้เลือก project';

  const [projectPercent, setProjectPercent] = useState(initProjPercent);
  const [userPercent, setUserPercent] = useState(initUserPercent);
  const [projectName, setProjectName] = useState(initProjectName);

  useEffect(() => {
    if (hoverProjectContext.project !== 0) {
      setProjectPercent(
        hoverProjectContext.project
          ? hoverProjectContext.project.totalProjectScore === 0
            ? 0
            : (hoverProjectContext.project.doneProjectScore / hoverProjectContext.project.totalProjectScore) * 100
          : 0
      );
      setUserPercent(
        hoverProjectContext.project
          ? hoverProjectContext.project.totalUserScore === 0
            ? 0
            : (hoverProjectContext.project.doneUserScore / hoverProjectContext.project.totalUserScore) * 100
          : 0
      );
      setProjectName(hoverProjectContext.project ? hoverProjectContext.project.project_name : 'ยังไม่ได้เลือก project');
    } else {
    }
  }, [hoverProjectContext]);

  return (
    <div className="container-bar-project">
      <div className="bar-project-name"> PROJECT: {projectName}</div>
      <div className="project-percent">
        <p className="project-progress-label" style={{ backgroundColor: projectColor }}>
          G:
        </p>
        <div className="bar-project-percent-bg" style={{ color: projectColor, borderColor: projectColor }}>
          <div
            className="bar-project-percent"
            style={{ backgroundColor: projectColor, width: `${projectPercent}%` }}
          ></div>
          <div
            className="percent-on-color"
            style={{
              color: `${projectPercent < 40 ? projectColor : 'white'}`,
              right: `${projectPercent < 40 ? 0 : null}`,
            }}
          >{`${projectPercent}%`}</div>
        </div>
      </div>
      <div className="project-percent">
        <p className="project-progress-label" style={{ backgroundColor: userColor }}>
          P:
        </p>
        <div className="bar-project-percent-bg" style={{ color: userColor, borderColor: userColor }}>
          <div className="bar-project-percent" style={{ backgroundColor: userColor, width: `${userPercent}%` }}></div>
          <div
            className="percent-on-color"
            style={{ color: `${userPercent < 40 ? userColor : 'white'}`, right: `${userPercent < 40 ? 0 : null}` }}
          >{`${userPercent}%`}</div>
        </div>
      </div>
    </div>
  );
}

export default BarProject;
