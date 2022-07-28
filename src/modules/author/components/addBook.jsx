import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import imgBook from "../../../images/portada-generica.jpg";
import { AUTHORS } from "../graphQL/authors.query";
import { CREATE_BOOK } from "../graphQL/createBook.mutation";
import { useParams } from "react-router-dom";
import { BOOKS } from "../../book/graphQL/books.query";

const AddBook = () => {
  const { id } = useParams();
  const authorId = parseFloat(id);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: AUTHORS }, { query: BOOKS }],
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="title">New Book</h3>
      <div className="img-container">
        <img className="book-img" src={imgBook} alt="" />
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
  );
};

export default AddBook;
