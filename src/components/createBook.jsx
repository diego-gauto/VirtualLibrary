import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CREATE_BOOK } from "../graphQL/mutations/createBook.mutation";
import { AUTHORS } from "../graphQL/queries/authors.query";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/app.context";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { allAuthors, setAllAuthors, allBooks, setAllBooks } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { data } = useQuery(AUTHORS);
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    onCompleted: (data) => {
      window.alert(`Book ${title} has been created`);
      setAllBooks([...allBooks, data.createBook]);
      navigate("/AllBooks", { replace: true });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    createBook({ variables: { title, authorId } });
  };

  function validateForm() {
    return title.length > 0 && authorId.length > 0;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="title">
          <Form.Label>title</Form.Label>
          <Form.Control
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Create Book
        </Button>
      </Form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default CreateBook;
