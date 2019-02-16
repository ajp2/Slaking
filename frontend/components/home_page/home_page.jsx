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
          <h2>A better way to communicate.</h2>
          <h2>Get connected today with <span className='inline-logo'>Slaking</span></h2>
          {currentUser ? (
              <button onClick={this.messagesRedirect}>Back To Messages</button>
            ) : (
              <p>Don't have an account? <span className='guest-login' onClick={this.guestLogin}>Login as a Guest</span></p>
            )}
        </div>

        <p className='footer-link'><a href="http://www.github.com/ajp2/slaking" target='_blank'>Learn More</a></p>
      </div>
    );
  }
}

export default HomePage
