import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //   const storedCurrentUser = localStorage.getItem("currentUser");
  //   const [currentUser, setCurrentUser] = useState(
  //     storedCurrentUser ? `${storedCurrentUser}` : null
  //   );
  const [currentUser, setCurrentUser] = useState(null);

  const values = {
    currentUser: localStorage.getItem("currentUser") || currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
