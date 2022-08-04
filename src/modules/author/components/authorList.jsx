import { Table } from "react-bootstrap";
import AuthorRow from "./authorRow";
import React from "react";

const AuthorList = ({ authors }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Books</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <AuthorRow key={author.id} author={author} />
        ))}
      </tbody>
    </Table>
  );
};

export default AuthorList;
