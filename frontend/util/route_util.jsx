import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({component: Component, path, exact, loggedIn}) => (
  <Route path={path} exact={exact} render={props => (
    loggedIn ? (
      <Redirect to='/' />
    ) : (
      <Component {...props} />
    )
  )} />
);

const Protected = ({ component: Component, path, exact, loggedIn }) => (
  <Route path={path} exact={exact} render={props => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to='/login' />
    )
  )} />
);

const mapStateToProps = state => ({
  loggedIn: !!state.session.id
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));