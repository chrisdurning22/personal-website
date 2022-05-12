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
import { NoProps } from '../types/types';
import Api from '../api/api';

type AppState = {
  isUserLoggedIn: boolean;
}

class App extends React.Component<NoProps, AppState> {
  api: Api;
  
  constructor(props: any) {
    super(props);
    this.api = new Api();

    // check localStorage first (temporary solution - look at redux persist)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    this.state = {
      isUserLoggedIn: isLoggedIn,
    };

  }

  componentDidMount() {
    this.api.isUserLoggedIn()
      .then(() => {
        // user is logged in
        this.setIsUserLoggedIn(true);
      })
      .catch(() => {
        // user is logged out
        this.setIsUserLoggedIn(false);
      })
  }

  setIsUserLoggedIn(isUserLoggedIn: boolean): void {
    // (deletes token from cookies
    if(this.state.isUserLoggedIn && !isUserLoggedIn) {
      this.api.LogoutUser()
        .then((res) => {
          console.log('res ', res);
        })
        .catch((err) => {
          console.log('err ', err);
        })
    }

    this.setState({
      isUserLoggedIn: isUserLoggedIn
    })

    // set in localStorage for synchronous get on refresh (stops navbar buttons from flickering)
    localStorage.setItem('isLoggedIn', JSON.stringify(isUserLoggedIn));
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
                  <Nav.Link href="/">CV</Nav.Link>
                </Nav>
                <Nav>
                  { !this.state.isUserLoggedIn && 
                    <Nav.Link href="/login">Login</Nav.Link> 
                  }
                  { this.state.isUserLoggedIn && 
                    <Nav.Link href="/register">Register</Nav.Link> 
                  }
                  { this.state.isUserLoggedIn && 
                    <Nav.Link href="/" onClick={() => this.setIsUserLoggedIn(false)} className="d-flex">Logout</Nav.Link> 
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  setIsUserLoggedIn={(isUserLoggedIn: boolean) => this.setIsUserLoggedIn(isUserLoggedIn)}
                  isUserLoggedIn={this.state.isUserLoggedIn}
                />
              } 
            />  
            {this.state.isUserLoggedIn &&
              <Route path="/register" element={<Register />} />
            }
            {!this.state.isUserLoggedIn &&
              <Route 
                path="/login" 
                element={
                  <Login 
                    setIsUserLoggedIn={(isUserLoggedIn: boolean) => this.setIsUserLoggedIn(isUserLoggedIn)}
                  />
                } 
              />
            }
            {this.state.isUserLoggedIn &&
              <Route path="/logout" element={<Logout />} />
            }
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
      <h2>This page could not be found.</h2>
      <Link to="/">Go to the home page</Link>
    </div>
  );
}

export default App;