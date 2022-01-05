import { _post } from "./api";

// APIS
export const loginGoogle = (data) => {
  return _post("/api/v1/user/google_login", data);
};
