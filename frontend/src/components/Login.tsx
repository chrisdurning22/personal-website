import { AxiosResponse } from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Alert, Button, Form, Toast } from 'react-bootstrap';
import Api from '../api/api';
import { LoginDetails } from '../types/types';
import { useNavigate } from 'react-router-dom';

type LoginProps = {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void
}

// I used a functional component here because redirecting/navigating is much easier with functional components
function Login(props: LoginProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const api = new Api();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const loginDetails: LoginDetails = {
      email: email,
      password: password
    }

    api.LoginUser(loginDetails)
    .then((response: any) => {
      console.log('res ', response);

      // clear errors
      if(error != null) {
        setError(null);
      }

      // set isUserLoggedIn to true on App component
      props.setIsUserLoggedIn(true);

      // set user_id in local storage
      localStorage.setItem('user_id', JSON.stringify(response.user_id));

      // navigate to the home page after a successful login (uncomment this line below)
      navigate("/"); 
    })
    .catch((err: any) => {
      // set API error
      setError(err.detail);
    })
    
  }

    return (
      <div className="flex-center">
        <div className="auth-wrapper">
          <div className="auth-header">
            <h4>Please Login</h4>
          </div>
          {error != null &&
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
            <p>{error}</p>
            </Alert>
          }
          <div className="auth-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
              </Form.Group>
              <div className="auth-button">
                <Button variant="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
}

export default Login;
