import { _get } from "./api";

// APIS
export const getAllBranch = (data) => {
  return _get("/api/v1/store/getAllStore");
};

