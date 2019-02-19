import React, { Component } from 'react';

export class SessionForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      avatarFile: new File(["avatar"], window.default_avatar_url),
      avatarUrl: window.default_avatar_url
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileChange(e) {
    const file = e.currentTarget.files[0];
    this.setState({ avatarFile: file });

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ avatarUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
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
      user = new FormData();
      user.append('user[avatar]', this.state.avatarFile);
      user.append('user[username]', this.state.username);
      user.append('user[password]', this.state.password);
    }

    this.props.processForm(user)
      .then(() => this.props.history.push('/messages'));
  }

  handleModalClick(e) {
    if (e.target.classList[0] === 'modal') {
      this.props.history.push('/');
    }
  }

  render() {
    const loginForm = this.props.formType === 'login';
    const fileUpload = () => (
      <div className='file-container'>
        <p>Upload an avatar (optional)</p>
        <div className="file-upload">
          <img src={this.state.avatarUrl} alt="avatar" />
          <input
            type="file"
            name="avatar"
            onChange={this.handleFileChange} />
        </div>
      </div>
    );

    return (
      <div className='modal' onClick={this.handleModalClick}>
        <form className='form'>
          <h2>{loginForm ? 'Log in' : 'Sign Up'}</h2>
          <input 
            type="text"
            placeholder="Username" 
            name="username" 
            onChange={this.handleChange} 
          />

          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={this.handleChange} 
          />

          {!loginForm ? fileUpload() : false}

          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default SessionForm;
