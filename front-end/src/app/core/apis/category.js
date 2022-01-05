import { _get } from "./api";

// APIS
export const getAllCategory = () => {
  return _get("/api/v1/category/getListCategory",'');
};
