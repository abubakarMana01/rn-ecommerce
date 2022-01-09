import React, {createContext, useContext, useState} from 'react';

export type AuthContextTypes = {
  currentUser?: {user: {username: string; _id: string; email: string}} | null;
  setCurrentUser: Function;
};

export const AuthContext = createContext<AuthContextTypes | null>(null);

const AuthProvider: React.FC = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
