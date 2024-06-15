"use client";
import { createContext, useContext, useState, useEffect } from "react";

// context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Function to decode the JWT token and get the payload
  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token");
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = decodeToken(token);
      if (payload) {
        setUsername(payload.username);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const payload = decodeToken(token);
    if (payload) {
      setUsername(payload.username);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
