import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import HomePageContainer from './home_page/home_page_container';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import ChannelsContainer from './channels/channels_container';

const App = (props) => (
  <div>
    <Switch>
      <ProtectedRoute path='/messages/:channelId' component={ChannelsContainer} />
      <Route path='/' component={HomePageContainer} />
    </Switch>

    {props.location.pathname === '/messages' ? (<Redirect to='/messages/1' />) : false}
    <AuthRoute path='/login' component={LoginFormContainer} />
    <AuthRoute path='/signup' component={SignupFormContainer} />
    
  </div>
);

export default withRouter(App);