import React from "react";
import { AuthContext } from "./AuthContextProvider";

export const useAuth = (): {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext must be within AuthProvider");
  }

  // @ts-ignore
  return context;
};
