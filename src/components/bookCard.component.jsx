import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { AppContext } from "../context/app.context";
import { useUserContext } from "../context/user.context";
import { BORROW_BOOK } from "../graphQL/mutations/borrowBook.mutation";
import { DELETE_BOOK } from "../graphQL/mutations/deleteBook.mutation";
import { RETURN_BOOK } from "../graphQL/mutations/returnBook.mutation";
import imgBook from "../images/portada-generica.jpg";
import "../styles/bookCard.css";

const BookCard = ({ book }) => {
  const { id, title, returnBookDate, author, isOnLoan } = book;
  const { allBooks, setAllBooks } = useContext(AppContext);
  const { user } = useUserContext();
  const userId = user.id;

  const [deleteBook, { loadingDelete, errorDelete }] = useMutation(
    DELETE_BOOK,
    {
      onCompleted: () => {
        const books = allBooks.filter((book) => book.id !== id);
        setAllBooks(books);
      },
    }
  );

  const [borrowBook, { loadingBorrow, errorBorrow }] = useMutation(
    BORROW_BOOK,
    {
      onCompleted: () => {},
    }
  );

  const [returnBook, { loadingReturn, errorReturn }] = useMutation(
    RETURN_BOOK,
    {
      onCompleted: () => {},
    }
  );

  const bookState = (returnBookDate) => {
    const now = new Date();
    return now > returnBookDate ? "Book on time" : "Book on penalization";
  };

  const parseDate = (date) => {
    return date.split("T")[0];
  };

  const handleDelete = () => {
    deleteBook({ variables: { id } });
  };

  const handleTakeOut = () => {
    borrowBook({ variables: { id, userId } });
  };

  const handleReturn = () => {
    returnBook({ variables: { id, userId } });
  };

  if (loadingDelete || loadingBorrow || loadingReturn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-card">
      <h3 className="book-title">{title}</h3>
      <div className="book">
        <div className="ImgBook">
          <img src={imgBook} alt="" />
        </div>
        <div className="book-info">
          <h5 className="book-author">{author.fullName}</h5>
          {isOnLoan && (
            <>
              <span className="book-date">Return book date</span>
              <span className="book-date">{parseDate(returnBookDate)}</span>
            </>
          )}
        </div>
      </div>
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
