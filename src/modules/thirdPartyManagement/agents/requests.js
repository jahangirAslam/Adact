import {get, post, del, put } from "@utils/axios";

const api = "third-party/agents";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getAgents = (payload) => {
    return get(api, payload);
}

export const getAgent = (id) => {
    return get(`${api}/${id}`);
}

export const createAgent = (payload) => {
    return post(api, payload);
}

export const updateAgent = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteAgents = (payload) => {
    return post(`${api}/bulkDelete`, payload);
}