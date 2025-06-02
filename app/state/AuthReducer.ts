import { AuthAction, AuthState } from "../type";

const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
