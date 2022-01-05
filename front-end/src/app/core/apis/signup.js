import { _post } from "./api";

// APIS
export const signup = (data) => {
  return _post("/api/v1/user/register", data);
};
