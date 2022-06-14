import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user.context";

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
              <LinkContainer to="/UserProfile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Authors">
                <LinkContainer to="/Authors">
                  <NavDropdown.Item>All authors</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/CreateAuthor">
                  <NavDropdown.Item>Create author</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown title="Books" id="collasible-nav-dropdown">
                <LinkContainer to="/Books">
                  <NavDropdown.Item>All books</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item href="#AllAvailableBooks">
                  All available books
                </NavDropdown.Item>
              </NavDropdown>
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
