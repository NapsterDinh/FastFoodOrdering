import data from './data.json'

export const getAllCity = () => (data)

export const getAllProvinceByCity = (index) => (data[index].districts)

export const getAllTownByProvince = (arr, index) => {
    return(
        arr[index].wards
    )
}

const query = {
    getAllCity,
    getAllProvinceByCity,
    getAllTownByProvince
}
export default query