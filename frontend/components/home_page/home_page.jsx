import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
    const sessionLinks = () => (
      <ul className='nav-list'>
        <li>
          <button onClick={this.guestLogin}>Login As Guest</button>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
      </ul>
    );

    const logout = () => (
      <ul className='nav-list'>
        <li>Welcome, {this.props.currentUser.username}</li>
        <li>
          <button onClick={this.props.logout}>Logout</button>
        </li>
      </ul>
    );

    return (
      <div>
        <nav>
          <h1>Slaking</h1>
          {this.props.currentUser ? logout() : sessionLinks() }
        </nav>

        {this.props.currentUser ? <button onClick={this.messagesRedirect}>Back To Messages</button> : null}
      </div>
    );
  }
}

export default HomePage
