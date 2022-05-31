import React, { Component } from 'react'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      error: null,
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:  this.state.username,
        email: this.state.email,
        password: this.state.password,
        })
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

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  render() {
    return (
      <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          No account? <a href="/sign-up">Sign up</a>
        </p>
      </form>
    )
  }
}