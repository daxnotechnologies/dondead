import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
// import Pages from './pages';
// import Users from './users';

import Ecommerce from './ecommerce';

import withAdminLayout from '../../layout/withAdminLayout';

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/ecommerce`} component={Ecommerce} />
        {/* <Route path={`${path}`} component={Pages} />

        <Route path={`${path}/users`} component={Users} /> */}
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
