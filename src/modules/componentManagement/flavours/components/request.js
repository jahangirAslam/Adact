import {get, post, del, put, postFd } from "@utils/axios";

const api = "component-management/flavours";

export const createFlavour = (payload) => {
    return post(api, payload);
}
export const getFlavours = (payload) => {
    return get(api, payload);
}
export const getFlavour = (id) => {
    return get(`${api}/${id}`);
}
export const updateSubstance = (payload) => {
    console.log(payload);
    return put(`${api}/${payload.id}`, payload);
};