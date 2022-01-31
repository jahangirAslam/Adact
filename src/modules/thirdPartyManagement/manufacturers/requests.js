import { get, post, del, put } from "@utils/axios";

const api = "third-party/manufacturer";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getManufacturers = (payload) => {
    return get(api, payload);
}

export const getManufacturer = (id) => {
    return get(`${api}/${id}`);
}

export const createManufacturer = (payload) => {
    return post(api, payload);
}

export const updateManufacturer = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteManufacturer = (id) => {
    return del(`${api}/${id}`);
}
