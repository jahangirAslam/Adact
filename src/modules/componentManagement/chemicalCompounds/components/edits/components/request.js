import {get, post, del, put } from "@utils/axios";

const api = "component-management/formulations";

export const createFormulation = (payload) => {
    return post(api, payload);
}
export const getFormulation = (payload) => {
    return get(api, payload);
}
export const getFlavour = (id) => {
    return get(`${api}/${id}`);
}
export const updateSubstance = (payload) => {
    console.log(payload);
    return put(`${api}/${payload.id}`, payload);
};
export const deleteFormulation = (payload) => {
    return post(`${api}/bulkDelete`, payload);
}
export const getFilters = () => {
    return get(`${api}/filters`);
}
export const getProductDependencies = () => {

    return get(`${api}/dependencies`);
}
export const getFormulations = (payload) => {
    return get(api, payload);
}