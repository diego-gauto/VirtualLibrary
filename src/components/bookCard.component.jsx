import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { AppContext } from "../context/app.context";
import { DELETE_BOOK } from "../graphQL/mutations/deleteBook.mutation";
import "../styles/bookCard.css";

const BookCard = ({ book }) => {
  const { id, title, returnBookDate, author, isOnLoan } = book;
  const { allBooks, setAllBooks } = useContext(AppContext);

  const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const bookState = (returnBookDate) => {
    const now = new Date();
    return now > returnBookDate ? "Book on time" : "Book on penalization";
  };

  const parseDate = (date) => {
    return date.split("T")[0];
  };

  const handleDelete = () => {
    deleteBook(parseInt(id));
    const books = allBooks.filter((book) => book.id !== id);
    setAllBooks(books);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card className="bookCard text-center">
        <Card.Header>Serial Book Number: {id}</Card.Header>
        <Card.Body>
          <Card.Title>Title: {title}</Card.Title>
          <Card.Subtitle>Author: {author.fullName}</Card.Subtitle>
          {isOnLoan ? (
            <div>
              <Card.Text>Return Date: {parseDate(returnBookDate)}</Card.Text>
              <Button variant="primary"> Return book</Button>
            </div>
          ) : (
            <div>
              <Button variant="primary"> Take out book</Button>
              <Button variant="primary" onClick={handleDelete}>
                {" "}
                Delete book
              </Button>
            </div>
          )}
        </Card.Body>
        <Card.Footer>
          {isOnLoan ? bookState(returnBookDate) : "Available book"}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default BookCard;
