import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateRoutes from "../routes.jsx";
import { AppContext } from "../context/app.context";
import { useUserContext } from "../context/user.context";
import "../styles/App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [allAuthors, setAllAuthors] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const { signOut, user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) userHasAuthenticated(true);
  }, [user]);

  async function handleLogout() {
    signOut();
    userHasAuthenticated(false);
    navigate("/login");
  }

  return (
    <div className="App container py-3">
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
              Indy{" "}
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
                  <LinkContainer to="/AllAuthors">
                    <NavDropdown.Item>All authors</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item href="#SearchAuthor">
                    Search author by name
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <LinkContainer to="/CreateAuthor">
                    <NavDropdown.Item>Create author</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item href="#UpdateAuthor">
                    Update author
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#DeleteAuthor">
                    Delete author
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Books" id="collasible-nav-dropdown">
                  <LinkContainer to="/AllBooks">
                    <NavDropdown.Item>All books</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item href="#AllAvailableBooks">
                    All available books
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#SearchBook">
                    Search book by name
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#CreateBook">
                    Create book
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#UpdateBook">
                    Update book
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#DeleteBook">
                    Delete book
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
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
        </Container>
      </Navbar>
      <AppContext.Provider
        value={{
          isAuthenticated,
          userHasAuthenticated,
          allAuthors,
          setAllAuthors,
          allBooks,
          setAllBooks,
        }}
      >
        <CreateRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
