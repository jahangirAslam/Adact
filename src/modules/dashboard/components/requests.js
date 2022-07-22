import {get } from "@utils/axios";

const api = "product-management/dashboard/product";

export const getDashbordData = (payload) => {

    return get(api, payload);
}