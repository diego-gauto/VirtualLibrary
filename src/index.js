import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./modules/app/app";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { initApolloClient, getApolloClient } from "./config/apolloConfig";
import UserContextProvider from "./context/user.context";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Inicializa Apollo usando la variable de entorno del .env correspondiente
const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URL;
if (!GRAPHQL_URI) {
  throw new Error(
    "REACT_APP_GRAPHQL_URL no está definida. Agrega la variable al archivo .env.development o .env.production según el entorno."
  );
}

initApolloClient(GRAPHQL_URI);

root.render(
  <React.StrictMode>
    <ApolloProvider client={getApolloClient()}>
      <Router>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
