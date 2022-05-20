import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import { Auth } from "aws-amplify";
import CreateRoutes from "../routes.jsx";
import { AppContext } from "../context/app.context";
import { useUserContext } from "../context/user.context";
import "../styles/App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const { signOut, user } = useUserContext();

  useEffect(() => {
    if (user) userHasAuthenticated(true);
  }, [user]);

  async function handleLogout() {
    signOut();
    userHasAuthenticated(false);
  }

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand href="/" className="font-weight-bold text-muted">
            Indy
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <CreateRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
