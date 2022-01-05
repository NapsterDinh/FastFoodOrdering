import { _patch } from "./api";

//api

export const uploadAvatar = (data) => {
  return _patch("/api/upload_avatar", data);
};
