import { createContext, useEffect, useState } from "react";
import { setAdminHeader } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("pe_user");
    if (saved) {
      const u = JSON.parse(saved);
      setUser(u);
      setAdminHeader(Number(u.isAdmin) === 1);
    }
  }, []);

  const login = (u) => {
    setUser(u);
    localStorage.setItem("pe_user", JSON.stringify(u));
    setAdminHeader(Number(u.isAdmin) === 1);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pe_user");
    setAdminHeader(false);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
