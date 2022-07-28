import { Container } from "react-bootstrap";
import imgBook from "../../../images/portada-generica.jpg";
import parseDate from "../../../utils/parseDate";

const BookInfo = ({ book }) => {
  const { title, author } = book;
  return (
    <Container className="book-container">
      <div>
        <img className="book-img" src={imgBook} alt="" />
      </div>
      <div className="book-info">
        <h2>{title}</h2>
        <h4>Author: {author.fullName}</h4>
        {book.isOnLoan ? (
          <div>
            <h6>Not available</h6>
            <span>Return day: {parseDate(book.returnBookDate)}</span>
          </div>
        ) : (
          <h6>Available</h6>
        )}
      </div>
    </Container>
  );
};

export default BookInfo;
