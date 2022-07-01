import {get, post, delWithPayload, put } from "@utils/axios";

const api = "product-management/products";

export const createProduct = (payload) => {
    return post(api, payload);
}
export const getAllProducts = (payload) => {
    return get(api, payload);
}
export const getProduct = (id) => {
    return get(`${api}/${id}`);
}
export const deleteProduct = (payload) => {
    return post(`${api}/bulkDelete`, payload);
}
export const getFilters = () => {

    return get(`${api}/filters`);
}
export const updateSubstance = (payload) => {

    return put(`${api}/${payload.id}`, payload);

};
export const getProductDependencies = () => {
    return get(`${api}/dependencies`);
}