import {get, post, del, put } from "@utils/axios";

const api = "component-management/formulations";

export const createFlavour = (payload) => {
    return post(api, payload);
}
export const getFlavours = (payload) => {
    return get(api, payload);
}
export const getFlavour = (id) => {
    return get(`${api}/${id}`);
}
export const updateSubstance = (payload) => {
    console.log(payload);
    return put(`${api}/${payload.id}`, payload);
};
export const deleteFlavour = (payload) => {
    return post(`${api}/bulkDelete`, payload);
}
export const getFilters = () => {
    return get(`${api}/filters`);
}
export const getProductDependencies = () => {

    return get(`${api}/dependencies`);
}