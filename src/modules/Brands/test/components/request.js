import {get, post, del, put } from "@utils/axios";

const api = "common/brands";

export const createItem = (payload) => {

    return post(api, payload);
}
export const getAllItems = (payload) => {
    return get(api, payload);
}
export const getItem = (id) => {
    return get(`${api}/${id}`);
}
export const deleteItems = (payload) => {
    return post(`${api}/bulkDelete`, payload);
}
export const getFilters = () => {

    return get(`${api}/filters`);
}
export const updateSubstance = (payload) => {

    return put(`${api}/${payload.id}`, payload);

};
export const getDependencies = () => {
    return get(`${api}/dependencies`);
}