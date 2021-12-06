import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Ecommerce = lazy(() => import('../../container/dashboard/Ecommerce'));

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Ecommerce} />
    </Switch>
  );
};

export default DashboardRoutes;
