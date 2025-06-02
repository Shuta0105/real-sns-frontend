"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import AuthReducer from "./AuthReducer";
import { AuthAction, AuthState } from "../type";
import Cookies from "js-cookie";

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const getInitialUser = () => {
  const cookie = Cookies.get("user");
  if (!cookie) {
    return null;
  }
  return JSON.parse(cookie);
};

const initialState: AuthState = {
  user: getInitialUser(),
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  dispatch: () => {},
});

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    Cookies.set("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
