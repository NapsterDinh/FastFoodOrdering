import { _post } from "./api";

// APIS
export const loginFaceBook = (data) => {
  return _post("/api/v1/user/facebook_login", data);
};
