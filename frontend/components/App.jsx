import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import HomePageContainer from './home_page/home_page_container';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import ChannelListContainer from './channels/channel_list_container';

const App = (props) => (
  <div>
    <Switch>
      <Route exact path='/' component={HomePageContainer} />
      {props.location.pathname === '/messages' ? (<Redirect to='/messages/1' />) : false}
    </Switch>

    <AuthRoute path='/login' component={LoginFormContainer} />
    <AuthRoute path='/signup' component={SignupFormContainer} />
    <ProtectedRoute path='/messages/:channelId' component={ChannelListContainer} />
  </div>
);

export default withRouter(App);