import { get, post, del, put } from "@utils/axios";

const api = "third-party/facilities";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getFacilities = (payload) => {
    return get(api, payload);
}

export const getFacility = (id) => {
    return get(`${api}/${id}`);
}

export const createFacility = (payload) => {
    return post(api, payload);
}

export const updateFacility = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteFacility = (id) => {
    return del(`${api}/${id}`);
}
