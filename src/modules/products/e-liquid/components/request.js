import {get, post, del, put, postFd } from "@utils/axios";

const api = "/product-management/eliquid";

export const createProduct = (payload) => {

    return post(api, payload);
}
export const getAllProducts = (payload) => {
    return get(api, payload);
}
export const getProduct = (id) => {
    return get(`${api}/${id}`);
}
export const deleteProduct = (id) => {
    return del(`${api}/${id}`);
}
export const updateSubstance = (payload) => {

    return put(`${api}/${payload.id}`, payload);

};