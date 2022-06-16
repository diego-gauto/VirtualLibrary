import { useMutation } from "@apollo/client";
import { useUserContext } from "../context/user.context";
import { BORROW_BOOK } from "../graphQL/mutations/borrowBook.mutation";
import { DELETE_BOOK } from "../graphQL/mutations/deleteBook.mutation";
import { RETURN_BOOK } from "../graphQL/mutations/returnBook.mutation";
import { BOOKS } from "../graphQL/queries/books.query";
import { AUTHOR } from "../graphQL/queries/author.query";
import { USER } from "../graphQL/queries/user.query";
import imgBook from "../images/portada-generica.jpg";
import "../styles/bookCard.css";

const BookCard = ({ book }) => {
  const { id, title, returnBookDate, author, isOnLoan } = book;
  const { user } = useUserContext();
  const userId = user.id;
  const authorId = author.id;

  const [deleteBook, { loadingDelete, errorDelete }] = useMutation(
    DELETE_BOOK,
    {
      refetchQueries: [
        { query: BOOKS },
        { query: AUTHOR, variables: { id: authorId } },
        { query: USER, variables: { id: userId } },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        window.alert(`Book ${title} has been deleted`);
      },
    }
  );

  const [borrowBook, { loadingBorrow, errorBorrow }] = useMutation(
    BORROW_BOOK,
    {
      refetchQueries: [
        { query: BOOKS },
        { query: AUTHOR, variables: { id: authorId } },
        { query: USER, variables: { id: userId } },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        window.alert(`Book ${title} has been taken`);
      },
    }
  );

  const [returnBook, { loadingReturn, errorReturn }] = useMutation(
    RETURN_BOOK,
    {
      refetchQueries: [
        { query: BOOKS },
        { query: AUTHOR, variables: { id: authorId } },
        { query: USER, variables: { id: userId } },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        window.alert(`Book ${title} has been return`);
      },
    }
  );

  const bookState = (returnBookDate) => {
    const now = new Date();
    const returnDate = new Date(returnBookDate);
    return now < returnDate ? "Book on time" : "Book on penalization";
  };

  const parseDate = (date) => {
    return date.split("T")[0];
  };

  const handleDelete = () => {
    deleteBook({ variables: { id } });
  };

  const handleTakeOut = () => {
    borrowBook({ variables: { bookId: id, userId: userId } });
  };

  const handleReturn = () => {
    returnBook({ variables: { bookId: id, userId: userId } });
  };

  if (loadingDelete || loadingBorrow || loadingReturn) {
    return <div>Loading...</div>;
  }

  if (errorBorrow) return `Error! ${errorBorrow.message}`;
  if (errorReturn) return `Error! ${errorReturn.message}`;
  if (errorDelete) return `Error! ${errorDelete.message}`;

  return (
    <div className="book-card">
      <h3 className="book-title">{title}</h3>
      <h5 className="book-author">Author: {author.fullName}</h5>
      <div className="ImgBook">
        <img src={imgBook} alt="" />
      </div>
      {isOnLoan && (
        <span className="book-date">
          Return book date: {parseDate(returnBookDate)}
        </span>
      )}
      <div className="button-container">
        {isOnLoan ? (
          <button className="btn book-btn" onClick={handleReturn}>
            {" "}
            Return book
          </button>
        ) : (
          <>
            <button className="btn book-btn" onClick={handleTakeOut}>
              {" "}
              Take out{" "}
            </button>
            <button className="btn book-btn" onClick={handleDelete}>
              {" "}
              Delete{" "}
            </button>
          </>
        )}
      </div>
      <h5 className="book-state">
        {isOnLoan ? bookState(returnBookDate) : "Available book"}
      </h5>
    </div>
  );
};

export default BookCard;
