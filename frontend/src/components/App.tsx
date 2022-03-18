import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/js/all.js';
import { NoProps } from '../types/types';

interface AppState {
  isUserLoggedIn: boolean
}

class App extends React.Component<NoProps, AppState> {
  constructor(props: any) {
    super(props);
    console.log('app ', props);
    this.state = {
      isUserLoggedIn: false,
    };
  }

  setIsUserLoggedIn(isUserLoggedIn: boolean): void{
    this.setState({
      isUserLoggedIn: isUserLoggedIn
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Curriculum Vitae</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                  { this.state.isUserLoggedIn ? <Nav.Link href="/logout" onClick={() => {this.setState({isUserLoggedIn: false})}} className="d-flex">Logout</Nav.Link> : null }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Routes>
            <Route path="/" element={
              <Home 
                setIsUserLoggedIn={(isUserLoggedIn: boolean) => this.setIsUserLoggedIn(isUserLoggedIn)}
                isUserLoggedIn={this.state.isUserLoggedIn}
              />
            } />  
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={
              <Login 
                setIsUserLoggedIn={(isUserLoggedIn: boolean) => this.setIsUserLoggedIn(isUserLoggedIn)}
              />
            } />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function Logout() {
  return (
    <div>
      <h2>You have successfully logged out!</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
