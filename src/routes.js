import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  HashRouter  as Router
} from 'react-router-dom';
import HomePage from './HomePage';


export default ({ routeProps }) => {
  return (
    <Router>
      <Switch>
        { <Redirect exact from='/' to='/apitest' /> }

        {/* <Route path="/noAuth" component={ NotFound } /> */}
        <Route path="/apitest" component={ HomePage } />
       
      </Switch>
    </Router>
  );
};
