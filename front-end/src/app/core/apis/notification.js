import { _get, _delete, _post } from "./api";

// APIS
export const getListNotificationByIdUser = () => {
  return _get("/api/v1/notification/listAllNotification", "");
};

export const markAsReadAll = () => {
  return _get("/api/v1/notification/markReadAll", "");
};

export const markAsRead = (data) => {
  return _post("/api/v1/notification/markRead", data);
};

//delete
export const deleteNotificationByIdNotify = (id) => {
  return _delete("/api/v1/notification/deleteNotificationById", { _id: id });
};
