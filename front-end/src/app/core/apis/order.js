import { _post, _get, _put } from "./api";

// APIS
export const payment = (data) => {
  return _post("/api/v1/order/payment",data);
};

export const paymentCOD = (data) => {
  return _post("/api/v1/order/paymentCOD",data);
};

export const paymentPaypal = (data) => {
  return _post("/api/v1/order/paymentPaypal",data);
};

export const getListOrder = (data) => {
  return _get("/api/v1/order/getListOrder", data);
};

export const getDetailOrderById = (data) => {
  return _get("/api/v1/order/orderById", data);
};

export const cancelOrder = (data) => {
  return _put("/api/v1/order/cancelOrder", data);
};

