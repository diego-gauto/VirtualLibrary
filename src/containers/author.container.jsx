import { useQuery } from "@apollo/client";
import AuthorCard from "../components/authorCard.component";
import { AUTHORS } from "../graphQL/queries/authors.query";
import { Row } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/app.context";

const AllAutors = () => {
  const { allAuthors, setAllAuthors } = useContext(AppContext);

  const { loading, error, data } = useQuery(AUTHORS);

  useEffect(() => {}, [allAuthors]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (allAuthors.length === 0) setAllAuthors(data.getAllAuthors);

  return (
    <Row md={3}>
      {allAuthors.map((author) => {
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
