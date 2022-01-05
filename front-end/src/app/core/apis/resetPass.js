import { _post } from "./api";
export const resetPass = (data) => {
  return _post("/api/v1/user/reset", data);
};
