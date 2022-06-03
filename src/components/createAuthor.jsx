import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CREATE_AUTHOR } from "../graphQL/mutations/createAuthor.mutation";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/app.context";

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
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            autoFocus
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Create Author
        </Button>
      </Form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default CreateAuthor;
