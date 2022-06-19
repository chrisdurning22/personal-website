import { AnyNaptrRecord } from 'dns';
import React, { SyntheticEvent, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { RegisterUser } from '../api/api';
import { NoProps } from '../types/types';

type RegisterState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: string[] | null;
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const setError = (errorObject: { field: string[] } | null) => {
    if (errorObject == null) {
      setErrors([]);
    }
    else {
      let errors: string[] = [];

      Object.entries(errorObject).forEach(([key, value]) => {
        errors.push(value[0]);
      });

      setErrors(errors as any);
    }
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      setError({
        field: ['passwords do not match.']
      })
    }
    else {
      const postObject = {
        name,
        email,
        password,
        confirmPassword
      }
  
      RegisterUser(postObject)
        .then(() => {
          setError(null);
        })
        .catch((err) => {
          setError(err);
        })
    }
  }

  return (
    <div className="flex-center">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h4>Please Register</h4>
        </div>
        { errors != null &&
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {
              errors.map((value, index) => {
                return (
                  <label key={index}>{value}</label>
                )
              })
            }
          </Alert>
        }
        <div className="auth-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" required onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" required onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" required onChange={e => setConfirmPassword(e.target.value)}/>
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

export default Register;