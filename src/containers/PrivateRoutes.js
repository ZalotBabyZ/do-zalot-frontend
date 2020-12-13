import React from 'react';
import { Route, Switch } from 'react-router-dom';
import permissionList from '../config/roles.js';
import Layout from './Layout';
import NotFound from '../pages/NotFound';

function PrivateRoutes(props) {
  const role = props.role || 'guest';
  const pageList = permissionList[role];

  //   console.log(permissionList);

  return (
    <Switch>
      {pageList.map((page) => (
        <Route exact path={page.url}>
          <Layout role={role} setRole={props.setRole} page={page.url}>
            <page.page setRole={props.setRole} />
          </Layout>
        </Route>
      ))}
      <Route path="*">
        <Layout role={role} setRole={props.setRole} page="notFound">
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
}

export default PrivateRoutes;
