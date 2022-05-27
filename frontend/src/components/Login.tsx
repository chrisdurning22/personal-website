import { SyntheticEvent, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { LoginUser } from '../api/api';
import { LoginDetails } from '../types/types';
import { useNavigate } from 'react-router-dom';

type LoginProps = {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void
}

function Login({setIsUserLoggedIn}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const loginDetails: LoginDetails = {
      email: email,
      password: password
    }

    LoginUser(loginDetails)
    .then(() => {
      // clear errors
      if(error != null) {
        setError(null);
      }

      // set isUserLoggedIn to true on App component
      setIsUserLoggedIn(true);

      // navigate to the home page after a successful login
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
            <label>{error}</label>
          </Alert>
        }
        <div className="auth-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" required onChange={e => setPassword(e.target.value)}/>
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
