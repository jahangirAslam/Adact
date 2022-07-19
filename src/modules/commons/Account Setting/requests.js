import {get, post, del, put } from "@utils/axios";

const api = "third-party/companies";
const accountSettings = "third-party/account/setting";

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
    return put(`${api}/${payload.id}`, payload);
}

export const deleteCompany = (id) => {
    return del(`${api}/${id}`);
}

export const addAcSettings = (payload) => {
    return post(accountSettings, payload);
}