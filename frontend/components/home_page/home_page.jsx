import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class HomePage extends Component {
  render() {
    return (
      <div>
        <nav>
          Slaking
          <ul className='nav-list'>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default HomePage
