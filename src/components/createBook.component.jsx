import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import imgBook from "../images/portada-generica.jpg";
import "../styles/forms.css";
import { AUTHORS } from "../graphQL/queries/authors.query";
import { CREATE_BOOK } from "../graphQL/mutations/createBook.mutation";
import { useParams } from "react-router-dom";

const CreateBook = () => {
  const { id } = useParams();
  const authorId = parseFloat(id);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: AUTHORS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      navigate(`/Author/${id}`);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    createBook({ variables: { title: title, authorId: authorId } });
  };

  function validateForm() {
    return title.length > 0;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="generic-form">
      <form onSubmit={handleSubmit}>
        <h3 className="title">New Book</h3>
        <div className="ImgUser">
          <img src={imgBook} alt="" />
        </div>
        <div className="input-container">
          <label className="label">Book title</label>
          <input
            autoFocus
            type="text"
            className="form-control"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="btn" type="submit">
            Create book
          </button>
        </div>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default CreateBook;
