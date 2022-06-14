import React, { useState, useEffect } from "react";
import CreateRoutes from "../routes.jsx";
import { AppContext } from "../context/app.context";
import { useUserContext } from "../context/user.context";
import NavBar from "./navBar.component.jsx";
import "../styles/App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [hasReturn, setHasReturn] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (user) userHasAuthenticated(true);
  }, [user]);

  return (
    <div className="App container py-3">
      <NavBar
        isAuthenticated={isAuthenticated}
        userHasAuthenticated={userHasAuthenticated}
      />
      <AppContext.Provider
        value={{
          isAuthenticated,
          userHasAuthenticated,
          hasReturn,
          setHasReturn,
        }}
      >
        <CreateRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
