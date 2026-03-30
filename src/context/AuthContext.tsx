import React, { createContext, useMemo, useState } from "react";

type AuthUser = unknown;

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (nextUser: AuthUser) => void;
  logout: () => void;
};

const defaultValue: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextValue>(defaultValue);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (nextUser: AuthUser) => setUser(nextUser);
  const logout = () => setUser(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
