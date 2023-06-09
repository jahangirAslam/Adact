import {get, post, del, put } from "@utils/axios";

const api = "third-party/companies";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getCompanys = (payload) => {
    return get(api, payload);
}

export const getCompany = (id) => {
    return get(`${api}/${id}`);
}

export const createCompany = (payload) => {
    return post(api, payload);
}

export const updateCompany = (payload) => {
    return put(`third-party/allparties/${payload.id}`, payload);
}

export const deleteCompany = (id) => {
    return del(`${api}/${id}`);
}