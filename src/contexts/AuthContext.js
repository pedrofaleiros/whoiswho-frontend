import { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  const login = (username, token, userId) => {
    Cookies.set("@whoiswho.token", token, { expires: 1 });
    Cookies.set("@whoiswho.userId", userId, { expires: 1 });
    setToken(token);
    setUsername(username);
  };

  const logout = () => {
    Cookies.remove("@whoiswho.token");
    Cookies.remove("@whoiswho.userid");
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
