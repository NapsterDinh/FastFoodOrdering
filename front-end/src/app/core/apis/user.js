import { _get, _post, _delete, _put } from "./api";

// APIS
export const updateAdressAPI = (data) => {
  return _put("/api/v1/user/updateAddress", data);
};

export const createNewAddressAPI = (data) => {
  return _post("/api/v1/user/newAddress", data);
};

export const deleteAddressAPI = (data) => {
  return _delete("/api/v1/user/deleteAddress", {
    _id: data
  });
};

export const getAllAddressUser = (data) => {
  return _get("/api/v1/user/getAllAddressUser");
};

export const updateDefaultAddress = (data) => {
  return _put("/api/v1/user/updateDefaultAddress", {
    id: data
  });
};

export const getLatLongByAddress = (data) => {
  return _get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data}.json?access_token=pk.eyJ1IjoicGhhbmNhb2N1b25nIiwiYSI6ImNreGc2NWo4azBiZ3oycG1hcTExdm0wc3kifQ.uACLQeXQRPZe9TgwEvcXEA`);
};

export const getDistance = (data) => {
  return _get(`https://api.mapbox.com/directions/v5/mapbox/driving/${data.lng1},${data.lat1};${data.lng2},${data.lat2}?access_token=pk.eyJ1IjoicGhhbmNhb2N1b25nIiwiYSI6ImNreGc2NWo4azBiZ3oycG1hcTExdm0wc3kifQ.uACLQeXQRPZe9TgwEvcXEA`);
};

