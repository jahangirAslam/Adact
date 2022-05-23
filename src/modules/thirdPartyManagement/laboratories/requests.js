import {get, post, del, put } from "@utils/axios";

const api = "third-party/laboratories";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getLaboratories = (payload) => {
    return get(api, payload);
}

export const getLaboratory = (id) => {
    return get(`${api}/${id}`);
}

export const createLaboratory = (payload) => {
    return post(api, payload);
}

export const updateLaboratory = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteLaboratory = (id) => {
    return del(`${api}/${id}`);
}