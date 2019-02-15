import React, { Component } from 'react';
import Header from './header';


export class HomePage extends Component {
  constructor(props) {
    super(props);

    this.messagesRedirect = this.messagesRedirect.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  messagesRedirect(e) {
    this.props.history.push('/messages');
  }

  guestLogin(e) {
    this.props.loginAsGuest()
      .then(() => this.props.history.push('/messages'));
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className='home'>
        <Header
          currentUser={currentUser}
          logout={this.props.logout}
          loginAsGuest={this.props.loginAsGuest}
        />

        <div className="main-text">
          {currentUser ? <button onClick={this.messagesRedirect}>Back To Messages</button> : null}
          <h2>Where everyone comes together. Get connected today with Slaking</h2>
          <p>Don't have an account? <span className='guest-login' onClick={this.guestLogin}>Login as a Guest</span></p>
        </div>
      </div>
    );
  }
}

export default HomePage
