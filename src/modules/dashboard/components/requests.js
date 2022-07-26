import {get } from "@utils/axios";

const api = "product-management/total/product";
const product = "product-management/anual/product";
export const getDashbordData = (payload) => {

    return get(api, payload);
}
export const getProductData = (payload) => {
    return get(`${product}?year=${payload}`);
}