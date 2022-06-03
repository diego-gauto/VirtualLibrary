import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SIGNUP } from "../graphQL/mutations/signup.mutation";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [register, { loading, error }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      console.log(data);
      navigate("/login", { replace: true });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    register({ variables: { fullName, email, password } });
    navigate("/login");
  };

  function validateForm() {
    return fullName.length > 0 && email.length > 0 && password.length > 0;
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
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          SignUp
        </Button>
      </Form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default SignUp;
