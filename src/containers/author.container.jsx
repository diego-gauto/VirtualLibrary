import React from "react";
import { useQuery } from "@apollo/client";
import AuthorCard from "../components/authorCard.component";
import { AUTHORS } from "../graphQL/queries/authors.query";
import { Row } from "react-bootstrap";

const AllAutors = () => {
  const { loading, error, data } = useQuery(AUTHORS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const authors = data.getAllAuthors;

  return (
    <Row md={3}>
      {authors.map((author) => {
        return (
          <AuthorCard
            key={author.id}
            id={author.id}
            fullName={author.fullName}
          />
        );
      })}
    </Row>
  );
};

export default AllAutors;
