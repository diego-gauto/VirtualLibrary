import { useQuery } from "@apollo/client";
import { BOOKS } from "../graphQL/queries/books.query";
import { Row } from "react-bootstrap";

import BookCard from "../components/bookCard.component";

const AllBooks = () => {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const books = data.getAllBooks;

  return (
    <Row md={3}>
      {books.map((book) => {
        return <BookCard key={book.id} book={book} />;
      })}
    </Row>
  );
};

export default AllBooks;
