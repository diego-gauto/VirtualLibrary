import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { AppContext } from "../context/app.context";
import authorImg from "../images/carlos_ruiz_zafon.jpg";

const AuthorDetails = () => {
  const { id } = useParams();
  const { allAuthors } = useContext(AppContext);

  const author = allAuthors.filter((author) => author.id === Number(id))[0];

  console.log(allAuthors);
  console.log(author);
  console.log(id);

  return (
    <div>
      <Card style={{ width: "18rem" }} className=" authorCard text-center">
        <Card.Header>Author Number: {id}</Card.Header>
        <Card.Img variant="top" src={authorImg} />
        <Card.Body>
          <Card.Title>Author: {author.fullName}</Card.Title>
          <Button variant="primary"> Update author</Button>
          <Button variant="primary"> Delete author</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AuthorDetails;
