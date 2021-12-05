import { get, post, del, put } from "@utils/axios";

const api = "user-management/users";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getUserDependencies = () => {
    return get(`${api}/dependencies`);
}

export const getUsers = (payload) => {
    return get(api, payload);
}

export const getUser = (id) => {
    return get(`${api}/${id}`);
}

export const createUser = (payload) => {
    return post(api, payload);
}

export const updateUser = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteUser = (id) => {
    return del(`${api}/${id}`);
}
