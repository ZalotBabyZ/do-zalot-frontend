import { useState } from 'react';
import './style.css';

function BarProject(props) {
  //เดี๋ยวอันนี้รอข้อมูลจากbackend ลบ แล้วใช้แค่ props.xxx ไม่มีค่าdefault
  const initProjPercent = props.projectPercent ? props.projectPercent : 50;
  const initUserPercent = props.userPercent ? props.userPercent : 30;
  const projectColor = props.projectColor ? props.projectColor : 'var(--thirdary-color)';
  const userColor = props.userColor ? props.userColor : 'var(--secondary-color)';
  const projectName = props.projectName ? props.projectName : 'ชื่อโปรเจคตรงนี้';

  const [projectPercent, setProjectPercent] = useState(initProjPercent);
  const [userPercent, setUserPercent] = useState(initUserPercent);

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
