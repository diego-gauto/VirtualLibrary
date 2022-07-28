import React, { useState, useEffect } from "react";
import CreateRoutes from "./components/routes.jsx";
import { AppContext } from "../../context/app.context";
import { useUserContext } from "../../context/user.context";
import NavBar from "./components/navBar.jsx";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [hasReturn, setHasReturn] = useState(false);
  const [book, setBook] = useState({});
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
          book,
          setBook,
        }}
      >
        <CreateRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
