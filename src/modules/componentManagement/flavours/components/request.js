import {get, post, del, put, postFd } from "@utils/axios";

const api = "component-management/flavours";

export const createFlavour = (payload) => {
    debugger
    return post(api, payload);
}