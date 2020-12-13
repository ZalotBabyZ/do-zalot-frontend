import './App.css';
import { useState } from 'react';
import PrivateRoutes from './containers/PrivateRoutes';
import LocalStorage from './services/localStorage';
import UserContext from './context/UserContext';

function App() {
  const [role, setRole] = useState(LocalStorage.getUser().role);
  const [vip, setVip] = useState(LocalStorage.getUser().userVip);
  const [projectList, setProjectList] = useState(LocalStorage.getUser().userProject);
  const [username, setUsername] = useState(LocalStorage.getUser().username);
  // const [page, setPage] = useState({ url: '/' });

  return (
    <div className="App" style={{ width: '100vw' }}>
      <UserContext.Provider value={{ username, setUsername, vip, setVip, projectList, setProjectList }}>
        {/* <PageContext.Provider value={{ page, setPage }}> */}
        <PrivateRoutes role={role} setRole={setRole} />
        {/* </PageContext.Provider> */}
      </UserContext.Provider>
    </div>
  );
}

export default App;
