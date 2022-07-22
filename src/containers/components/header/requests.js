import {get, post, del, put } from "@utils/axios";
const api = "user-management/users";
export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getContacts = (payload) => {
    return get(api, payload);
}

export const getContact = (id) => {
    return get(`${api}/${id}`);
}

export const createContact = (payload) => {
    return post(api, payload);
}

export const updateContact = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteContact = (id) => {
    return del(`${api}/${id}`);
}