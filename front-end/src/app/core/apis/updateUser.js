import { _patch } from "./api";

//api

export const updateUser = (data) => {
  return _patch("/user/update", data);
};
