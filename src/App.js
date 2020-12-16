import './App.css';
import { useState, useEffect } from 'react';
import PrivateRoutes from './containers/PrivateRoutes';
import LocalStorage from './services/localStorage';
import UserContext from './context/UserContext';
import HoverProjectContext from './context/HoverProjectContext';
import SelectProjectContext from './context/SelectProjectContext';

function App() {
  const [role, setRole] = useState(LocalStorage.getUser().role);
  const [username, setUsername] = useState(LocalStorage.getUser().username);
  const [vip, setVip] = useState(LocalStorage.getUser().userVip);
  const [userProject, setUserProject] = useState(LocalStorage.getUser().userProject);
  const [selectProject, setSelectProject] = useState(JSON.parse(localStorage.getItem('selectProject')));
  // const [selectProject, setSelectProject] = useState();
  const [hoverProject, setHoverProject] = useState(0);

  useEffect(() => {
    setUsername(LocalStorage.getUser().username);
    setVip(LocalStorage.getUser().userVip);
    setUserProject(LocalStorage.getUser().userProject);
    setSelectProject(0);
  }, [role]);

  return (
    <div className="App" style={{ width: '100vw' }}>
      <UserContext.Provider value={{ role, setRole, username, setUsername, vip, setVip, userProject, setUserProject }}>
        <SelectProjectContext.Provider value={{ project: selectProject, setProject: setSelectProject }}>
          <HoverProjectContext.Provider value={{ project: hoverProject, setProject: setHoverProject }}>
            <PrivateRoutes />
          </HoverProjectContext.Provider>
        </SelectProjectContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
