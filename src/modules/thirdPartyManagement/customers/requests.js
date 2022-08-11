import {get, post, del, put } from "@utils/axios";

const api = "third-party/customers";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getCustomers = (payload) => {
    return get(api, payload);
}

export const getCustomer = (id) => {
    return get(`${api}/${id}`);
}

export const createCustomer = (payload) => {
    return post(api, payload);
}

export const updateCustomer = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteCustomer = (payload) => {
    return post(`${api}/bulkDelete`, payload);
}