import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import { AUTH } from "../constants";

const UserContext = createContext({
  signIn: () => {},
  signOut: () => {},
  user: null,
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH.token);
    localStorage.removeItem(AUTH.user);
    setUser(null);
  }, []);

  const signIn = useCallback((user, token) => {
    localStorage.setItem(AUTH.token, token);
    localStorage.setItem(AUTH.user, JSON.stringify(user));
    setUser(user);
  }, []);

  useEffect(() => {
    const restoreUser = () => {
      const user = localStorage.getItem(AUTH.user);
      if (user) {
        const decodedUser = JSON.parse(user);
        setUser(decodedUser);
      }
    };

    restoreUser();
  }, []);

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      user,
    }),
    [signIn, signOut, user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

export default UserContextProvider;
