import { _get, _post, _delete, _put } from "./api";

// APIS
export const addToCartAPI = (data) => {
  return _post("/api/v1/cartItem/addToCart", data);
};

export const removeFromCart = (data) => {
  return _delete("/api/v1/cartItem/deleteCartItem", data);
};

export const updateCartItemAPI = (data) => {
  return _put("/api/v1/cartItem/updateCartItem", data);
};

export const getCartByUserId = (data) => {
  return _post("/api/v1/cart/getByUserId", data);
};

export const createShare = (data) => {
  return _post("/api/v1/cart/createShare", data);
};

export const checkShareCart = (data) => {
  return _post("/api/v1/cart/checkShareCart", data);
};

export const removeShareCart = (data) => {
  return _post("/api/v1/cart/removeShareCart", data);
};

export const doneOrder = (data) => {
  return _post("/api/v1/cart/doneOrder", data);
};

export const joinOrder = (data) => {
  return _post("/api/v1/cart/joinOrder", data);
};

export const checkoutAvailable = (data) => {
  return _post("/api/v1/cart/checkoutAvailable", data);
};
