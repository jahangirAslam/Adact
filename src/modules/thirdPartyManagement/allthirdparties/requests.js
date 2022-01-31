import { get, post, del, put } from "@utils/axios";

const api = "third-party/allparties";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getAllThirdParties = (payload) => {
    return get(api, payload);
}

export const getAllThirdParty = (id) => {
    return get(`${api}/${id}`);
}

export const createAllThirdParty = (payload) => {
    return post(api, payload);
}

export const updateAllThirdParty = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteAllThirdParty = (id) => {
    return del(`${api}/${id}`);
}
