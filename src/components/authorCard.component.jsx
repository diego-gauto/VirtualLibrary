import Card from "react-bootstrap/Card";
import authorImg from "../images/carlos_ruiz_zafon.jpg";
import "../styles/authorCard.css";

const AuthorCard = ({ id, fullName }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }} className=" authorCard text-center">
        <Card.Header>Author Number: {id}</Card.Header>
        <Card.Img variant="top" src={authorImg} />
        <Card.Body>
          <Card.Title>Author: {fullName}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AuthorCard;
