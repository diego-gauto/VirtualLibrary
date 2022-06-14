import React from "react";
import { Link } from "react-router-dom";
import imgAuthor from "../images/icono-escritor.jpg";
import "../styles/authorCard.css";

const AuthorCard = ({ id, fullName }) => {
  return (
    <div className="author-card">
      <h3 className="author-title">{fullName}</h3>
      <div className="ImgAuthor">
        <img src={imgAuthor} alt="" />
      </div>
      <div className="button-container">
        <Link to={`/Author/${id}`}>
          <button className="btn author-btn"> View profile </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
