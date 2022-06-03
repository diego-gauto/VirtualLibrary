import "../styles/userProfile.css";

const UserProfileCard = ({ username, nBooks }) => {
  return (
    <div className="container userContainer d-flex justify-content-center align-items-start">
      <div className="userCard">
        <div className="upper">
          <img
            src="https://lapiedradesisifo.com/wp-content/uploads/2019/10/libreria-para-empresas.jpg"
            //          className="img-fluid"
            height="80"
            alt=""
          />
        </div>

        <div className="user text-center">
          <div className="profile">
            <img
              src="https://i.imgur.com/JgYD2nQ.jpg"
              className="rounded-circle"
              width="80"
              alt=""
            />
          </div>
        </div>

        <div className="text-center">
          <h4 className="mb-1 mt-1 ">{username} (user)</h4>

          <button className="btn mb-4 mt-1 btn-primary btn-sm follow">
            Edit profile
          </button>

          <div className="d-flex justify-content-center align-items-center mt-1 px-4">
            <div className="stats">
              <h6 className="mb-0 mt-2">Borrowed books</h6>
              <span className>{nBooks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
