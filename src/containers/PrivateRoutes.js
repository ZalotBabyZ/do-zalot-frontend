import { useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import permissionList from '../config/roles.js';
import Layout from './Layout';
import NotFound from '../pages/NotFound';
import UserContext from '../context/UserContext';

function PrivateRoutes() {
  const userContext = useContext(UserContext);
  const pageList = permissionList[userContext.role];

  //   console.log(permissionList);

  return (
    <Switch>
      {pageList.map((page) => (
        <Route exact path={page.url}>
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
