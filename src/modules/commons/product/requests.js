import {get, post, del, put } from "@utils/axios";

const api = "product-management/products";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getBrandDependencies = () => {
    return get(`${api}/dependencies`);
}

export const getBrands = (payload) => {
    return get(api, payload);
}

export const getBrand = (id) => {
    return get(`${api}/${id}`);
}

export const createBrand = (payload) => {
    return post(api, payload);
}

export const updateBrand = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteBrand = (id) => {
    return del(`${api}/${id}`);
}