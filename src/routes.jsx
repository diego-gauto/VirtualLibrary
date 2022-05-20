import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/home";
import NotFound from "./containers/notFound";
import Login from "./containers/login";

const CreateRoutes = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CreateRoutes;
