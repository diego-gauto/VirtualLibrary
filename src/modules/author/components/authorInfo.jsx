import React from "react";
import { Container } from "react-bootstrap";
import imgAuthor from "../../../images/icono-escritor.jpg";
import "../styles/authors.css";

const AuthorInfo = ({ fullName, nbooks }) => {
  return (
    <Container className="author-container">
      <div>
        <img className="author-img" src={imgAuthor} alt="" />
      </div>
      <div className="author-info">
        <h3>{fullName}</h3>
        <h5># books: {nbooks}</h5>
      </div>
    </Container>
  );
};

export default AuthorInfo;
