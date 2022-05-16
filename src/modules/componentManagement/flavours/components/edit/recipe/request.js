import {get, post, del, put, postFd } from "@utils/axios";

const api = "component-management/flavourRecipie";

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
export const deleteFlavour = (id) => {
    return del(`${api}/${id}`);
}
export const getFilters = () => {
    return get(`${api}/filters`);
}
export const getProductDependencies = () => {
    return get(`${api}/dependencies`);
}