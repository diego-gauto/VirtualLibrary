import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/app.context";
import { BORROW_BOOK } from "../graphQL/borrowBook.mutation";
import { DELETE_BOOK } from "../graphQL/deleteBook.mutation";
import { RETURN_BOOK } from "../graphQL/returnBook.mutation";
import { AUTHOR } from "../../author/graphQL/author.query";
import { BOOK } from "../graphQL/book.query";
import { BOOKS } from "../graphQL/books.query";
import { USER } from "../../user/graphQL/user.query";
import { restoreUser } from "../../user/utils/restoreUser";
import BookInfo from "./bookInfo";
import "../styles/books.css";

const Book = () => {
  const navigate = useNavigate();
  const user = restoreUser();
  let { book } = useContext(AppContext);
  const bookId = book.id;

  const { loading, error, data } = useQuery(BOOK, {
    variables: { id: bookId },
  });

  const [deleteBook, { loadingDelete, errorDelete }] = useMutation(
    DELETE_BOOK,
    {
      refetchQueries: [
        { query: BOOKS },
        { query: AUTHOR, variables: { id: book.author.id } },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        window.alert(`Book ${book.title} has been deleted`);
        navigate(`/author/${book.author.id}`);
      },
    }
  );

  const [borrowBook, { loadingBorrow, errorBorrow }] = useMutation(
    BORROW_BOOK,
    {
      refetchQueries: [
        { query: BOOKS },
        { query: BOOK, variables: { id: bookId } },
        { query: AUTHOR, variables: { id: book.author.id } },
        { query: USER, variables: { id: user.id } },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        window.alert(`Book ${book.title} has been taken`);
      },
    }
  );

  const [returnBook, { loadingReturn, errorReturn }] = useMutation(
    RETURN_BOOK,
    {
      refetchQueries: [
        { query: BOOKS },
        { query: BOOK, variables: { id: bookId } },
        { query: AUTHOR, variables: { id: book.author.id } },
        { query: USER, variables: { id: user.id } },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        window.alert(`Book ${book.title} has been return`);
      },
    }
  );

  const handleDelete = () => {
    deleteBook({ variables: { id: bookId } });
  };

  const handleTakeOut = () => {
    borrowBook({ variables: { bookId: bookId, userId: user.id } });
  };

  const handleReturn = () => {
    returnBook({ variables: { bookId: bookId, userId: user.id } });
  };

  if (loading || loadingBorrow || loadingDelete || loadingReturn)
    return <div>Loading...</div>;

  if (error) return <div>`Error! ${error.message}`</div>;
  if (errorBorrow) return <div>`Error! ${errorBorrow.message}`</div>;
  if (errorReturn) return <div>`Error! ${errorReturn.message}`</div>;
  if (errorDelete) return <div>`Error! ${errorDelete.message}`</div>;

  book = data.getBookById;

  return (
    <Container>
      <div>
        <BookInfo book={book} />
      </div>
      <div>
        {book.isOnLoan ? (
          <Button className="btn" onClick={handleReturn}>
            Return book
          </Button>
        ) : (
          <>
            <Button className="btn" onClick={handleTakeOut}>
              Take out book
            </Button>{" "}
            <Button className="btn" onClick={handleDelete}>
              Delete book
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};

export default Book;
