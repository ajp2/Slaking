import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './home_page';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";

const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={HomePage} />
    </Switch>

    <Route path='/login' component={LoginFormContainer} />
    <Route path='/signup' component={SignupFormContainer} />
  </div>
);

export default App;