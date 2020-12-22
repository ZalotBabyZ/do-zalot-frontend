import './App.css';
import { useState, useEffect } from 'react';
import PrivateRoutes from './containers/PrivateRoutes';
import LocalStorage from './services/localStorage';
import UserContext from './context/UserContext';
import HoverProjectContext from './context/HoverProjectContext';
import SelectProjectContext from './context/SelectProjectContext';

function App() {
  const [role, setRole] = useState(LocalStorage.getUser().role);
  const [user, setUser] = useState(LocalStorage.getUser().user);
  const [userProject, setUserProject] = useState(LocalStorage.getUser().userProject);
  const [selectProject, setSelectProject] = useState(JSON.parse(localStorage.getItem('selectProject')));
  // const [selectProject, setSelectProject] = useState();
  const [hoverProject, setHoverProject] = useState(0);

  useEffect(() => {
    setUser(LocalStorage.getUser().user);
    setUserProject(LocalStorage.getUser().userProject);
    setSelectProject(JSON.parse(localStorage.getItem('selectProject')));
  }, [role]);
  return (
    <div className="App" style={{ width: '100vw' }}>
      <UserContext.Provider value={{ role, setRole, user, setUser, userProject, setUserProject }}>
        <SelectProjectContext.Provider
          value={{
            project: selectProject,
            setProject: setSelectProject,
          }}
        >
          <HoverProjectContext.Provider value={{ project: hoverProject, setProject: setHoverProject }}>
            <PrivateRoutes />
          </HoverProjectContext.Provider>
        </SelectProjectContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
