import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/app.context";
import parseDate from "../utils/parseDate";
import React from "react";

const BookRow = ({ book }) => {
  const navigate = useNavigate();
  const { setBook } = useContext(AppContext);

  const handleClick = () => {
    setBook(book);
    navigate(`/book/${book.id}`);
  };

  return (
    <tr className="pointer" onClick={handleClick}>
      <td>{book.title}</td>
      <td>{book.author.fullName}</td>
      <td>{book.isOnLoan ? "Not available" : "Available"}</td>
      <td>{book.isOnLoan ? parseDate(book.returnBookDate) : ""}</td>
    </tr>
  );
};

export default BookRow;
