import { useQuery } from "@apollo/client";
import { BOOKS } from "./graphQL/books.query";
import { Container } from "react-bootstrap";
import BooksList from "../../components/bookList.component";
import { useState } from "react";
import "./styles/books.css";
import ToggleSwitch from "./components/toggleSwitch";
import React, { useEffect } from "react";

const Books = () => {
  const [bookSearch, setBookSearch] = useState("");
  const [check, setCheck] = useState(true);
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>`Error! ${error.message}`</div>;

  const books = data.getAllBooks;

  const handleSearch = (event) => {
    setBookSearch(event.target.value);
  };

  const checkedBooks = check ? books : books.filter((book) => !book.isOnLoan);
  const filteredBooks = !bookSearch
    ? checkedBooks
    : checkedBooks.filter((book) =>
        book.title.toLowerCase().includes(bookSearch.toLowerCase())
      );

  return (
    <Container>
      <div className="search">
        <label htmlFor="book">Search book by name: </label>
        <input
          autoFocus
          id="book"
          name="book"
          type="text"
          className="form-control"
          value={bookSearch}
          onChange={handleSearch}
        />
      </div>
      <div className="selector">
        <ToggleSwitch
          label={"Filter books"}
          check={check}
          setCheck={setCheck}
        />
      </div>
      <div>
        <h5>{check ? "All books" : "Only available books"}</h5>
        <BooksList books={filteredBooks} />
      </div>
    </Container>
  );
};

export default Books;
