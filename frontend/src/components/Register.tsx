import React, { SyntheticEvent } from 'react';
import Api from '../api/api';
import './Register.css';

class Register extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null
    };
  }

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    Api.prototype.RegisterUser
    // RegisterUser({
    //   name: this.state.name,
    //   email: this.state.email,
    //   password: this.state.password
    // })
    //   .then()
    //   .catch()
  }

  render() {
  return (
    <div className="auth-wrapper">
      <h1>Please Register</h1>
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" onChange={e => this.setState({name: e.target.value})}/>
          </label>
          <label>
            <p>Email</p>
            <input name="email" onChange={e => this.setState({email: e.target.value})}/>
          </label>
          <label>
            <p>Password</p>
            <input name="password" onChange={e => this.setState({password: e.target.value})}/>
          </label>
          <label>
            <p>Re-enter Password</p>
            <input name="re-enter-password" />
          </label>
        </fieldset>
        <button type="submit">Register</button>
      </form>
    </div>
  );
  }
}

export default Register;