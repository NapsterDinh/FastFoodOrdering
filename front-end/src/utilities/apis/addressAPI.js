import { _get } from "../../app/core/apis/api";

// APIS
export const getAllCity = (data) => {
  return _get("https://provinces.open-api.vn/api/?depth=1");
};

export const getDetailCity = (data) => {
    return _get("https://thongtindoanhnghiep.co/api/city/"+data);
  };

export const getAllProvinceByCity = (data) => {
    return _get(`https://thongtindoanhnghiep.co/api/city/${data}/district`);
  };

export const getDetailProvince = (data) => {
    return _get(`https://thongtindoanhnghiep.co/api/district/${data}`);
  };

export const getAllTownByProvince = (data) => {
return _get(`https://thongtindoanhnghiep.co/api/district/2/${data}`);
};

export const getDetailTown = (data) => {
return _get(`https://thongtindoanhnghiep.co/api/ward/${data}`);
};
