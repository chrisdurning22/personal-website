import React, { SyntheticEvent } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Api from '../api/api';
import { NoProps } from '../types/types';

type RegisterState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: string[] | null;
}

class Register extends React.Component<NoProps, RegisterState> {
  api: Api;

  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: null
    };
    this.api = new Api();
  }

  setError(errorObject: { field: string[] } | null) {
    if(errorObject == null) {
      this.setState({
        errors: null
      })
    }
    else {
      let errors: string[] = [];

      Object.entries(errorObject).forEach(([key, value]) => {
        errors.push(value[0]);
      });

      this.setState({
        errors: errors
      })
    }
  }

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if(this.state.password !== this.state.confirmPassword) {
      this.setError({
        field: ['passwords do not match.']
      })
    }
    else {
      const postObject = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      }
  
      this.api.RegisterUser(postObject)
        .then(() => {
          this.setError(null);
        })
        .catch((err) => {
          this.setError(err);
        })
    }
  }

  render() {
  return (
    <div className="flex-center">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h4>Please Register</h4>
        </div>
        {this.state.errors != null &&
          <Alert variant="danger" onClose={() => this.setError(null)} dismissible>
            {
              this.state.errors.map((value, index) => {
                return (
                  <label key={index}>{value}</label>
                )
              })
            }
          </Alert>
        }
        <div className="auth-body">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" required onChange={e => this.setState({name: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required onChange={e => this.setState({email: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" required onChange={e => this.setState({password: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" required onChange={e => this.setState({confirmPassword: e.target.value})}/>
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