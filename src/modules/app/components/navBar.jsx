import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/user.context";

const NavBar = ({ isAuthenticated, userHasAuthenticated }) => {
  const { signOut, user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    // if (user) userHasAuthenticated(true);
  }, [user]);

  async function handleLogout() {
    signOut();
    userHasAuthenticated(false);
    navigate("/login");
  }

  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      expand="lg"
      variant="dark"
      className="mb-3"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            {" "}
            VLibrary{" "}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          {isAuthenticated && (
            <Nav className="me-auto">
              <LinkContainer to="/User">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/authors">
                <Nav.Link>Authors</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/books">
                <Nav.Link>Books</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>SignUp</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>SignIn</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
