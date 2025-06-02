export type PostType = {
  id: number;
  user_id: number;
  body: string;
  created_at: Date;
  image: string;
};

export type UserType = {
  id: number;
  username: string;
}

export interface AuthState {
  user: UserType | null;
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: UserType }
  | { type: "LOGIN_ERROR" };
