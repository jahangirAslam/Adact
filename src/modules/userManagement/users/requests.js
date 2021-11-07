import { get, post, del, put } from "@utils/axios";

const api = "user-management/users";

export const getUsers = (payload) => {
    return get(api, payload);
}

export const createUser = (payload) => {
    return post(api, payload);
}

export const updateUser = (payload) => {
    return put(api, payload);
}

export const deleteUser = (id) => {
    return del(`${api}/${id}`);
}
