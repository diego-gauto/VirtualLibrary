import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { AppContext } from "../context/app.context";
import { DELETE_AUTHOR } from "../graphQL/mutations/deleteAuthor.mutation";
import imgAuthor from "../images/icono-escritor.jpg";
import "../styles/authorCard.css";

const AuthorCard = ({ id, fullName }) => {
  const { allAuthors, setAllAuthors } = useContext(AppContext);

  const [deleteAuthor, { loading, error }] = useMutation(DELETE_AUTHOR, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const handleDelete = () => {
    deleteAuthor({ variables: { id } });
    const authors = allAuthors.filter((book) => book.id !== id);
    setAllAuthors(authors);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
