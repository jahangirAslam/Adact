import {get, post, del, put, postFd } from "@utils/axios";

const api = "component-management/flavours";

export const createFlavour = (payload) => {
    return post(api, payload);
}
export const getFlavours = (payload) => {
    return get(api, payload);
}