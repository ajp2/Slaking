import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePageContainer from './home_page/home_page_container';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";

const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={HomePageContainer} />
    </Switch>

    <Route path='/login' component={LoginFormContainer} />
    <Route path='/signup' component={SignupFormContainer} />
  </div>
);

export default App;