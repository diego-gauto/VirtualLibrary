import { Table } from "react-bootstrap";
import BookRow from "./bookRow.component";
import React from "react";

const BooksList = ({ books }) => {
  return (
    <div className="mt-2">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>State</th>
            <th>Return day</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookRow key={book.id} book={book} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BooksList;
