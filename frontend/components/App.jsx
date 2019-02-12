import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import HomePageContainer from './home_page/home_page_container';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import Messages from './messages/messages';

const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={HomePageContainer} />
    </Switch>

    <AuthRoute path='/login' component={LoginFormContainer} />
    <AuthRoute path='/signup' component={SignupFormContainer} />
    <ProtectedRoute path='/messages' component={Messages} />
  </div>
);

export default App;