import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import permissionList from '../config/roles.js';
import Layout from './Layout';
import NotFound from '../pages/NotFound';
import UserContext from '../context/UserContext';

function PrivateRoutes() {
  const userContext = useContext(UserContext);
  const pageList = permissionList[userContext.role];

  return (
    <Switch>
      {pageList.map((page, ind) => (
        <Route exact path={page.url} key={ind}>
          <Layout page={page.url}>
            <page.page />
          </Layout>
        </Route>
      ))}
      <Route path="*">
        <Layout page="notFound">
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
}

export default PrivateRoutes;
