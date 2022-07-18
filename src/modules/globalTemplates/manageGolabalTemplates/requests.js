import {get, post, del, put } from "@utils/axios";

const api = "setting/global/template";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getChemicalCompounds = (payload) => {
    return get(api, payload);
}

export const getChemicalCompound = (id) => {
    return get(`${api}/${id}`);
}

export const createChemicalCompound = (payload) => {
    return post(api, payload);
}

export const updateChemicalCompound = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteChemicalCompound = (id) => {
    return del(`${api}/${id}`);
}