import "../styles/userProfile.css";
import imgUser from "../images/icono-usuario.jpg";

const UserProfileCard = ({ username, nBooks }) => {
  return (
    <div className="user-form">
      <div className="ImgUserProfile">
        <img src={imgUser} alt="" />
      </div>
      <div className="user-info">
        <h3 className="user-title">{username}</h3>
        <h5 className="user-subtitle">Books taken</h5>
        <span className="user-text">{nBooks}</span>
      </div>
    </div>
  );
};

export default UserProfileCard;
