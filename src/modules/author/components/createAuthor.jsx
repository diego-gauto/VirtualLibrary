import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_AUTHOR } from "../graphQL/createAuthor.mutation";
import { useNavigate } from "react-router-dom";
import imgAuthor from "../../../images/icono-escritor.jpg";
import { AUTHORS } from "../graphQL/authors.query";

const CreateAuthor = () => {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: AUTHORS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      window.alert(`Author ${fullName} has been created`);
      navigate("/authors");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    createAuthor({ variables: { fullName } });
  };

  function validateForm() {
    return fullName.length > 0;
  }

  if (loading) return <div>Loading...</div>;

  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h3 className="title">New Author</h3>
        <div className="img-container">
          <img className="img-form" src={imgAuthor} alt="" />
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
    </div>
  );
};

export default CreateAuthor;
