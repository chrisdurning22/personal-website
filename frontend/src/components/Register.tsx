import React, { SyntheticEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import Api from '../api/api';
import { NoProps } from '../types/types';

type RegisterState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class Register extends React.Component<NoProps, RegisterState> {
  api: Api;

  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.api = new Api();
  }

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const postObject = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }

    this.api.RegisterUser(postObject)
      .then((res) => {
        console.log('res: ', res);
      })
      .catch((err) => {
        console.log('err: ', err);
      })
  }

  render() {
  return (
    <div className="flex-center">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h4>Please Register</h4>
        </div>
        <div className="auth-body">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" onChange={e => this.setState({name: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => this.setState({email: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" onChange={e => this.setState({password: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" onChange={e => this.setState({confirmPassword: e.target.value})}/>
            </Form.Group>
            <div className="auth-button">
              <Button variant="primary" type="submit">
                Sign up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
  }
}

export default Register;