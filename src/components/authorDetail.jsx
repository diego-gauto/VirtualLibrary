import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import BookCard from "../components/bookCard.component";
import { AUTH } from "../constants";
import { DELETE_AUTHOR } from "../graphQL/mutations/deleteAuthor.mutation";
import { AUTHOR } from "../graphQL/queries/author.query";
import { AUTHORS } from "../graphQL/queries/authors.query";
import { BOOKS } from "../graphQL/queries/books.query";
import { USER } from "../graphQL/queries/user.query";
import imgAuthor from "../images/icono-escritor.jpg";
import "../styles/authorProfile.css";

const AuthorDetails = () => {
  const restoreUser = () => {
    const user = localStorage.getItem(AUTH.user);
    let decodedUser = {};
    if (user) {
      decodedUser = JSON.parse(user);
    }
    return decodedUser;
  };

  const user = restoreUser();
  const { id } = useParams();

  const parseId = parseFloat(id);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(AUTHOR, {
    variables: { id: parseId },
  });

  const [deleteAuthor, { loadingDelete, errorDelete }] = useMutation(
    DELETE_AUTHOR,
    {
      refetchQueries: [
        { query: AUTHORS },
        { query: BOOKS },
        { query: USER, variables: { id: user.id } },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        window.alert(
          `Author ${author.fullName} has been deleted and also his/her books`
        );
        navigate("/Authors");
      },
    }
  );

  const handleDelete = () => {
    deleteAuthor({ variables: { id: parseId } }).catch((error) =>
      alert(`Author can't delete. ${error.message}`)
    );
  };

  if (loading || loadingDelete) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (errorDelete) return `Error! ${errorDelete.message}`;

  const author = data.getAuthorById;

  return (
    <>
      <div className="author-card">
        <h3 className="author-title">{author.fullName}</h3>
        <div className="ImgAuthor">
          <img src={imgAuthor} alt="" />
        </div>

        <Link to={`/CreateBook/${id}`}>
          <button className="btn authorProfile-btn"> Add book </button>
        </Link>
        <button className="btn authorProfile-btn" onClick={handleDelete}>
          {" "}
          Delete author{" "}
        </button>
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
