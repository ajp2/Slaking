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
  }

  render() {
    return (
      <form>
        <label htmlFor="user_username">Username:</label>
        <input type="text" id="user_username" name="username" onChange={this.handleChange} />

        {this.props.formType === 'signup' ? (
          <div>
            <label htmlFor="user_email">Email:</label>
            <input type="text" id="user_email" name="email" onChange={this.handleChange} />
          </div>
        ) : false }

        <label htmlFor="user_password">Password:</label>
        <input type="password" id="user_password" name="password" onChange={this.handleChange} />

        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default SessionForm;
