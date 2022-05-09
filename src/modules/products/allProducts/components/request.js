import {get, post, del, put, postFd } from "@utils/axios";

const api = "product-management/products";

export const createProduct = (payload) => {

    return post(api, payload);
}
export const getAllProducts = (payload) => {
    return get(api);

}
export const deleteCustomer = (id) => {
    return del(`${api}/${id}`);
}
export const getFilters = () => {

    return get(`${api}/filters`);
}
export const updateSubstance = (payload) => {
    return put(`${api}/${payload.id}`);
};