import { useQuery } from "@apollo/client";
import { BOOKS } from "../graphQL/queries/books.query";
import { Row } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/app.context";
import BookCard from "../components/bookCard.component";

const AllBooks = () => {
  const { allBooks, setAllBooks } = useContext(AppContext);

  const { loading, error, data } = useQuery(BOOKS);

  useEffect(() => {}, [allBooks]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (allBooks.length === 0) setAllBooks(data.getAllBooks);

  return (
    <Row md={3}>
      {allBooks.map((book) => {
        return <BookCard key={book.id} book={book} />;
      })}
    </Row>
  );
};

export default AllBooks;
