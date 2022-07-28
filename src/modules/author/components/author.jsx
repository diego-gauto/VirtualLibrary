import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { AUTHOR } from "../graphQL/author.query";
import BooksList from "../../../components/bookList.component";
import AuthorInfo from "./authorInfo";
import { DELETE_AUTHOR } from "../graphQL/deleteAuthor.mutation";
import { AUTHORS } from "../graphQL/authors.query";
import { BOOKS } from "../../book/graphQL/books.query";
import "../styles/authors.css";

const Author = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const parseId = parseFloat(id);

  const { loading, error, data } = useQuery(AUTHOR, {
    variables: { id: parseId },
  });

  const [deleteAuthor, { loadingDelete, errorDelete }] = useMutation(
    DELETE_AUTHOR,
    {
      refetchQueries: [{ query: AUTHORS }, { query: BOOKS }],
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
      alert(` ${error.message}`)
    );
  };

  if (loading || loadingDelete) return <div>Loading...</div>;

  if (error) return <div>`Error! ${error.message}`</div>;
  if (errorDelete) return <div>`Error! ${errorDelete.message}`</div>;

  const author = data.getAuthorById;

  return (
    <Container>
      <AuthorInfo fullName={author.fullName} nbooks={author.books.length} />
      <Button className="btn" onClick={handleDelete}>
        {" "}
        Delete author{" "}
      </Button>
      <div>
        <Link className="create-button" to={`/CreateBook/${id}`}>
          <Button className="btn"> Add book </Button>
        </Link>
      </div>
      <div>
        <h5>His/her books:</h5>
        <BooksList books={author.books} />
      </div>
    </Container>
  );
};

export default Author;
