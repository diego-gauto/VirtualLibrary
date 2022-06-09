import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_AUTHOR } from "../graphQL/mutations/createAuthor.mutation";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/app.context";
import imgAuthor from "../images/icono-escritor.jpg";
import "../styles/forms.css";

const CreateAuthor = () => {
  const [fullName, setFullName] = useState("");
  const { allAuthors, setAllAuthors } = useContext(AppContext);
  const navigate = useNavigate();
  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR, {
    onCompleted: (data) => {
      window.alert(`Author ${fullName} has been created`);
      setAllAuthors([...allAuthors, data.createAuthor]);
      navigate("/AllAuthors", { replace: true });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    createAuthor({ variables: { fullName } });
  };

  function validateForm() {
    return fullName.length > 0;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="generic-form">
      <form onSubmit={handleSubmit}>
        <h3 className="title">New Author</h3>
        <div className="ImgUser">
          <img src={imgAuthor} alt="" />
        </div>
        <div className="input-container">
          <label className="label">Author Name</label>
          <input
            autoFocus
            type="text"
            className="form-control"
            placeholder="Enter author name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="btn" type="submit">
            Create author
          </button>
        </div>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default CreateAuthor;