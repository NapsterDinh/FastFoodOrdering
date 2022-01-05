import { _get } from "./api";

// APIS
export const getAllProducts = () => {
  return _get("/api/v1/product/listProduct",'');
};

export const getListProductByIdCategory = (categoryId) => {
  return _get("/api/v1/product/listProductByCategoryId",{categoryId: categoryId});
};
