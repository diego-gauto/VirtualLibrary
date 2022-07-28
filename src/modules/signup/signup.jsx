import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { SIGNUP } from "./graphQL/signup.mutation";
import imgUser from "../../images/icono-usuario.jpg";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [register, { loading, error }] = useMutation(SIGNUP, {
    onCompleted: () => {
      window.alert(`User: ${fullName} has been created`);
      navigate("/login");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register({ variables: { fullName, email, password } });
  };

  function validateForm() {
    return fullName.length > 0 && email.length > 0 && password.length > 0;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h3 className="title">Sign Up</h3>
        <div className="img-container">
          <img className="img-form" src={imgUser} alt="" />
        </div>
        <div className="input-container">
          <label className="label">User Name</label>
          <input
            autoFocus
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="label">Email address</label>
          <input
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
            Sign Up
          </button>
        </div>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default SignUp;
