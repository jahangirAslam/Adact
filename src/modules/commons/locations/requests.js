import { get, post, del, put } from "@utils/axios";

const api = "common/location";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getLocationDependencies = () => {
    return get(`${api}/dependencies`);
}

export const getLocations = (payload) => {
    return get(api, payload);
}

export const getLocation = (id) => {
    return get(`${api}/${id}`);
}

export const createLocation = (payload) => {
    return post(api, payload);
}

export const updateLocation = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteLocation = (id) => {
    return del(`${api}/${id}`);
}
