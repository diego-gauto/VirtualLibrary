import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LOGIN } from "../graphQL/mutations/login.mutation";
import { useUserContext } from "../context/user.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useUserContext();
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const {
        login: { user, token },
      } = data;
      signIn(user, token);
      // navigate("/", { replace: true });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login({ variables: { email, password } });
    navigate("/userProfile");
  };

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
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
          Login
        </Button>
      </Form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Login;
