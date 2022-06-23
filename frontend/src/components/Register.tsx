import { SyntheticEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { RegisterUser } from '../api/api';
import { toast } from 'react-toastify';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      toast.dismiss();
      toast.error('Passwords Do Not Match', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
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
          toast.success('Registration Successful', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        })
        .catch((err) => {
          toast.dismiss();
          toast.error(err.detail, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        })
    }
  }

  return (
    <div className="flex-center">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h4>Please Register</h4>
        </div>
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