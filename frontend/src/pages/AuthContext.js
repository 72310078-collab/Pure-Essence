import { createContext, useState, useContext } from "react";
export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const login = (username, password) => {
    if (username === "Fatima" && password === "Dhayni") {
      setUser({ username }); 
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };
   
   
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
