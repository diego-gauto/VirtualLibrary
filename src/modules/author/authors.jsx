import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { AUTHORS } from "./graphQL/authors.query";
import { Container, Button } from "react-bootstrap";
import AuthorList from "./components/authorList";
import { useNavigate } from "react-router-dom";
import "./styles/authors.css";

const Autors = () => {
  const [authorSearch, setAuthorSearch] = useState("");
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(AUTHORS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>`Error! ${error.message}`</div>;

  const authors = data.getAllAuthors;

  const handleCreate = () => {
    navigate("/author/createAuthor");
  };

  const handleSearch = (event) => {
    setAuthorSearch(event.target.value);
  };

  const filteredAuthors = !authorSearch
    ? authors
    : authors.filter((author) =>
        author.fullName.toLowerCase().includes(authorSearch.toLowerCase())
      );

  return (
    <Container>
      <div className="search">
        <label for="author">Search author by name: </label>
        <input
          autoFocus
          id="author"
          name="author"
          type="text"
          className="form-control"
          value={authorSearch}
          onChange={handleSearch}
        />
      </div>
      <div className="create-button">
        <Button className="btn" onClick={handleCreate}>
          Create author
        </Button>
      </div>
      <div>
        <h5>All authors:</h5>
        <AuthorList authors={filteredAuthors} />
      </div>
    </Container>
  );
};

export default Autors;
