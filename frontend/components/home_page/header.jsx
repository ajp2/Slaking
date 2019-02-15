import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sessionLinks = () => (
      <ul className='nav-list'>
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
        <li>
          <button onClick={this.props.logout}>Logout</button>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className='navbar'>
          <h1 className='logo'><Link to='/'>Slaking</Link></h1>
          {this.props.currentUser ? logout() : sessionLinks()}
        </nav>
      </div>
    )
  }
}

export default withRouter(Header);