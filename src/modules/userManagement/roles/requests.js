import { get, post, del, put } from "@utils/axios";

const api = "user-management/roles";
const permissionApi = "user-management/permission";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getRoles = (payload) => {
    return get(api, payload);
}

export const getRole = (id) => {
    return get(`${api}/${id}`);
}

export const createRole = (payload) => {
    return post(api, payload);
}

export const createPermission = (payload) => {
    return post(permissionApi, payload);
}

export const deletePermission = (id) => {
    return del(`${permissionApi}/${id}`);
}
export const updateRole = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const deleteRole = (id) => {
    return del(`${api}/${id}`);
}
