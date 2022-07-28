import "../styles/userInfo.css";
import imgUser from "../../../images/icono-usuario.jpg";
import { Container } from "react-bootstrap";

const UserInfo = ({ username, email, nBooks }) => {
  return (
    <Container className="userContainer">
      <div>
        <img className="userImg" src={imgUser} alt="imgUser" />
      </div>
      <div className="userInfo">
        <h3>{username}</h3>
        <h5>{email}</h5>
        <span>Books taken: {nBooks}</span>
      </div>
    </Container>
  );
};

export default UserInfo;
