import { useState, useContext, useEffect } from 'react';
import './style.css';
import SelectProjectContext from '../../context/SelectProjectContext';
import HoverProjectContext from '../../context/HoverProjectContext';
import UserContext from '../../context/UserContext';

function BarProject(props) {
  const selectProjectContext = useContext(SelectProjectContext);
  const hoverProjectContext = useContext(HoverProjectContext);
  const userContext = useContext(UserContext);
  //เดี๋ยวอันนี้รอข้อมูลจากbackend ลบ แล้วใช้แค่ props.xxx ไม่มีค่าdefault
  const initProjPercent = selectProjectContext.project
    ? selectProjectContext.project.totalProjectScore === 0
      ? 0
      : (
          (selectProjectContext.project.doneProjectScore / selectProjectContext.project.totalProjectScore) *
          100
        ).toFixed(2)
    : '';
  const initUserPercent = selectProjectContext.project
    ? selectProjectContext.project.totalUserScore === 0
      ? 0
      : ((selectProjectContext.project.doneUserScore / selectProjectContext.project.totalUserScore) * 100).toFixed(2)
    : '';
  const initProjectColor = selectProjectContext.project
    ? selectProjectContext.project.projectColor
    : 'var(--thirdary-color)';
  const userColor = userContext.user ? userContext.user.userColor : 'var(--secondary-color)';
  const initProjectName = selectProjectContext.project
    ? selectProjectContext.project.project_name
    : 'ยังไม่ได้เลือก project';

  const [projectPercent, setProjectPercent] = useState(initProjPercent);
  const [userPercent, setUserPercent] = useState(initUserPercent);
  const [projectName, setProjectName] = useState(initProjectName);
  const [projectColor, setProjectColor] = useState(initProjectColor);

  useEffect(() => {
    if (hoverProjectContext.project !== 0) {
      setProjectPercent(
        hoverProjectContext.project
          ? hoverProjectContext.project.totalProjectScore === 0
            ? 0
            : (
                (hoverProjectContext.project.doneProjectScore / hoverProjectContext.project.totalProjectScore) *
                100
              ).toFixed(2)
          : 0
      );
      setUserPercent(
        hoverProjectContext.project
          ? hoverProjectContext.project.totalUserScore === 0
            ? 0
            : ((hoverProjectContext.project.doneUserScore / hoverProjectContext.project.totalUserScore) * 100).toFixed(
                2
              )
          : 0
      );
      setProjectName(hoverProjectContext.project ? hoverProjectContext.project.projectName : 'ยังไม่ได้เลือก project');
      setProjectColor(hoverProjectContext.project ? hoverProjectContext.project.projectColor : 'var(--thirdary-color)');
    } else {
      setProjectPercent(
        selectProjectContext.project
          ? selectProjectContext.project.totalProjectScore === 0
            ? 0
            : (
                (selectProjectContext.project.doneProjectScore / selectProjectContext.project.totalProjectScore) *
                100
              ).toFixed(2)
          : 0
      );
      setUserPercent(
        selectProjectContext.project
          ? selectProjectContext.project.totalUserScore === 0
            ? 0
            : (
                (selectProjectContext.project.doneUserScore / selectProjectContext.project.totalUserScore) *
                100
              ).toFixed(2)
          : 0
      );
      setProjectName(
        selectProjectContext.project ? selectProjectContext.project.projectName : 'ยังไม่ได้เลือก project'
      );
      setProjectColor(
        selectProjectContext.project ? selectProjectContext.project.projectColor : 'var(--thirdary-color)'
      );
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
              color: projectColor,
              right: `${projectPercent < 40 ? 0 : '-40px'}`,
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
            style={{ color: userColor, right: `${projectPercent < 40 ? 0 : '-40px'}` }}
          >{`${userPercent}%`}</div>
        </div>
      </div>
    </div>
  );
}

export default BarProject;
