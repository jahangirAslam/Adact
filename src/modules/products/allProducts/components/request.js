import {get, post, del, put, postFd } from "@utils/axios";

const api = "product-management/products";

export const createProduct = (payload) => {

    return post(api, payload);
}
export const getAllProducts = (payload) => {
    return get(api);

}