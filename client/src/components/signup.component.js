import React, { Component } from 'react'
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      error: null,
      username: '',
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this
      .signIn({
        username: this.state.username,
        password: this.state.password
      })
      .then(res =>
        this.setState({
          sessionToken: res.sessionToken
        })
      )
      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.statusCode + ' error', err);
      });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ? (
      <span className="error-message">{this.state.error}</span>
    ) : null;

    return (
      <form onSubmit={this.handleSubmit}>
        {errorMessage}
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Username</label>
          <input
            id="username"
            type="text"
            className="form-control"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            id="username"
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered? <a href="/sign-in">sign in</a>
        </p>
      </form>
    )
  }
}