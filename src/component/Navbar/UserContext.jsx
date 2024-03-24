import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id: null,
    userName: null
  });
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken") || null);

  const getUserData = () => {
    if (userToken != null) {
      const decodedToken = jwtDecode(userToken);
      setUserData({ id: decodedToken.id, userName: decodedToken.userName });
    }
  };

  const setUserName = (name) => {
    setUserData({ ...userData, userName: name });
  };

  useEffect(() => {
    getUserData();
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userToken, userData, setUserToken, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
