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

const CreateRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/userProfile" element={<UserContainer />} />
      <Route exact path="/Authors" element={<AllAuthors />} />
      <Route path="/Author/:id" element={<AuthorDetails />} />
      <Route exact path="/CreateAuthor" element={<CreateAuthor />} />
      <Route exact path="/Books" element={<AllBooks />} />
      <Route exact path="/AvailableBooks" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CreateRoutes;
