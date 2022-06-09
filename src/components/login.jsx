import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../graphQL/mutations/login.mutation";
import { useUserContext } from "../context/user.context";
import imgUser from "../images/icono-usuario.jpg";
import "../styles/forms.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useUserContext();
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const {
        login: { user, jwt },
      } = data;
      signIn(user, jwt);
      navigate("/userProfile");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login({ variables: { email, password } });
  };

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="generic-form">
      <form onSubmit={handleSubmit}>
        <h3 className="title">Sign In</h3>
        <div className="ImgUser">
          <img src={imgUser} alt="" />
        </div>
        <div className="input-container">
          <label className="label">Email address</label>
          <input
            autoFocus
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="btn" type="submit">
            Sign In
          </button>
        </div>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Login;
