import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../home/home";
import NotFound from "../../notFound/notFound";
import Login from "../../login/login";
import SignUp from "../../signup/signup";
import User from "../../user/user";
import Authors from "../../author/authors";
import CreateAuthor from "../../author/components/createAuthor";
import Books from "../../book/books";
import CreateBook from "../../author/components/addBook";
import AuthenticatedRoute from "./authenticatedRoute";
import UnauthenticatedRoute from "./unauthenticatedRoute";
import Book from "../../book/components/book";
import Author from "../../author/components/author";

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
        path="/user"
        element={
          <AuthenticatedRoute>
            <User />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/authors"
        element={
          <AuthenticatedRoute>
            <Authors />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/author/:id"
        element={
          <AuthenticatedRoute>
            <Author />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/author/createAuthor"
        element={
          <AuthenticatedRoute>
            <CreateAuthor />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/books"
        element={
          <AuthenticatedRoute>
            <Books />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/book/:id"
        element={
          <AuthenticatedRoute>
            <Book />
          </AuthenticatedRoute>
        }
      />
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
