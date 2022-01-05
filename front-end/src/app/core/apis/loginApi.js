import { _post } from "./api";

// APIS
export const loginApi = (data) => {
  return _post("/api/v1/user/login", data);
};
