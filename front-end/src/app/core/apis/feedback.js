import { _post } from "./api";
export const createFeedback = (data) => {
  return _post("/api/v1/feedback/create", data);
};
