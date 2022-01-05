import { _post } from "./api";
export const forgot = (data) => {
  return _post("/api//v1/auth/forgot", data);
};
