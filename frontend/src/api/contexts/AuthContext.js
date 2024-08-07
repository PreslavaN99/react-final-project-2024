import {createContext, useContext, useState} from "react";

export const AuthContext = createContext();

const state = {
  authenticatedUser: '',
  token: '',
  roles: ''
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(state);

  const login = (username) => {
    setUser({
      username,
      isAuthenticated: true
    });
  }
  const logout = () => {
    setUser({
      username: '',
      isAuthenticated: false
    });
  }

  return (
      <AuthContext.Provider value={{user, login, logout}}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}