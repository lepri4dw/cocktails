export interface IUser {
  _id: string;
  username: string;
  displayName: string
  password: string;
  token: string;
  role: string;
  avatar: string;
  googleId?: string;
}