import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";
import Login from "./components/login";
import SignUp from "./components/signup";
import UserContainer from "./containers/user.container";
import AllAuthors from "./containers/author.container";
import CreateAuthor from "./components/createAuthor";
import AllBooks from "./containers/books.container";
import AuthorDetails from "./components/authorDetail";
import CreateBook from "./components/createBook.component";
import AuthenticatedRoute from "./components/authenticatedRoute.component";
import UnauthenticatedRoute from "./components/unauthenticatedRoute.component";

const CreateRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        exact
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        exact
        path="/signup"
        element={
          <UnauthenticatedRoute>
            <SignUp />
          </UnauthenticatedRoute>
        }
      />
      <Route
        exact
        path="/userProfile"
        element={
          <AuthenticatedRoute>
            <UserContainer />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/Authors"
        element={
          <AuthenticatedRoute>
            <AllAuthors />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/Author/:id"
        element={
          <AuthenticatedRoute>
            <AuthorDetails />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/CreateAuthor"
        element={
          <AuthenticatedRoute>
            <CreateAuthor />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/Books"
        element={
          <AuthenticatedRoute>
            <AllBooks />
          </AuthenticatedRoute>
        }
      />
      <Route exact path="/AvailableBooks" />
      <Route
        path="/CreateBook/:id"
        element={
          <AuthenticatedRoute>
            <CreateBook />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CreateRoutes;
