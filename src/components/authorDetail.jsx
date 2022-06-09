import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/app.context";
import BookCard from "../components/bookCard.component";
import imgAuthor from "../images/icono-escritor.jpg";
import "../styles/authorProfile.css";

const AuthorDetails = () => {
  const { id } = useParams();
  const { allAuthors } = useContext(AppContext);

  const author = allAuthors.filter((author) => author.id === Number(id))[0];

  return (
    <>
      <div className="author-card">
        <h3 className="author-title">{author.fullName}</h3>
        <div className="ImgAuthor">
          <img src={imgAuthor} alt="" />
        </div>
        <div className="button-container">
          <button className="btn authorProfile-btn"> Add book </button>
          <button className="btn authorProfile-btn"> Delete author </button>
        </div>
      </div>
      <div className="row px-2">
        {author.books.map((book) => {
          return <BookCard key={book.id} book={{ ...book, author: author }} />;
        })}
      </div>
    </>
  );
};

export default AuthorDetails;
