import React, { Component } from 'react';

export class SessionForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user;
    if (this.props.formType === 'login') {
      user = {
        username: this.state.username,
        password: this.state.password
      };
    } else {
      user = this.state;
    }

    this.props.processForm(user)
      .then(() => this.props.history.push('/messages'));
  }

  render() {
    const loginForm = this.props.formType === 'login';

    return (
      <div className='modal'>
        <form className='session-form'>
          <h2>{loginForm ? 'Log in' : 'Sign Up'}</h2>
          <input 
            type="text"
            placeholder="Username" 
            name="username" 
            onChange={this.handleChange} 
          />

          {!loginForm ? (
              <input 
                type="text" 
                placeholder="Email" 
                name="email" 
                onChange={this.handleChange} />
          ) : false }

          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={this.handleChange} 
          />

          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default SessionForm;
