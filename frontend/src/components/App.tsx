import React, { useEffect, useState } from 'react';
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
import { ToastContainer } from 'react-toastify';
import { IsUserLoggedIn, LogoutUser } from '../api/api';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  
  useEffect(() => {
    IsUserLoggedIn()
      .then(() => {
        // user is logged in
        setIsUserLoggedIn(true);
      })
      .catch(() => {
        // user is logged out
        setIsUserLoggedIn(false);
      })
  }, []);

  const onSetIsUserLoggedIn = (userLoggedIn: boolean): void => {
      // (deletes token from cookies
    if (isUserLoggedIn && !userLoggedIn) {
      LogoutUser()
        .then((res) => {
          console.log('res ', res);
        })
        .catch((err) => {
          console.log('err ', err);
        })
    }

    setIsUserLoggedIn(userLoggedIn)

    // set in localStorage for synchronous get on refresh (stops navbar buttons from flickering)
    localStorage.setItem('isLoggedIn', JSON.stringify(userLoggedIn));
  }

    return (
      <div>
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
                    { !isUserLoggedIn && 
                      <Nav.Link href="/login">Login</Nav.Link> 
                    }
                    { isUserLoggedIn && 
                      <Nav.Link href="/register">Register</Nav.Link> 
                    }
                    { isUserLoggedIn && 
                      <Nav.Link href="/" onClick={() => onSetIsUserLoggedIn(false)} className="d-flex">Logout</Nav.Link> 
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
                    setIsUserLoggedIn={(isUserLoggedIn: boolean) => onSetIsUserLoggedIn(isUserLoggedIn)}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                } 
              />  
              {isUserLoggedIn &&
                <Route path="/register" element={<Register />} />
              }
              {!isUserLoggedIn &&
                <Route 
                  path="/login" 
                  element={
                    <Login 
                      setIsUserLoggedIn={(isUserLoggedIn: boolean) => onSetIsUserLoggedIn(isUserLoggedIn)}
                    />
                  } 
                />
              }
              {isUserLoggedIn &&
                <Route path="/logout" element={<Logout />} />
              }
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </div>
    );
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