import {get, post, del, put } from "@utils/axios";

const api = "component-management/substances";
const clp = "component-management/substances/clp";

export const getFilters = () => {
    return get(`${api}/filters`);
};

export const getSubstances = (payload) => {
    return get(api, payload);
};

export const getSubstance = (id) => {
    return get(`${api}/${id}`);
};

export const createSubstance = (payload) => {
    return post(api, payload);
};

export const updateSubstance = (payload) => {
    console.log(payload);
    return put(`${api}/${payload.id}`, payload);
};

export const deleteSubstance = (id) => {
    return del(`${api}/${id}`);
};
export const getDependencies = () => {
    return get(`${api}/dependencies`);
}
export const getDependenciesClp = () => {
    return get(`${clp}/dependencies`);
}