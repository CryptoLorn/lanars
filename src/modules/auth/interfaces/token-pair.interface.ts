export interface ITokenPair {
  access_token: string;
  refresh_token: string;
}

export interface ITokenPayload {
  user_id: string;
  email: string;
}
