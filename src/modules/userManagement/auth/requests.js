import { post } from "@utils/axios";

export const login = (payload) => {
    return post("login", payload, false);
}
export const forget = (payload) => {
    return post("forgot-password", payload, false);
}
export const reset = (payload) => {
    return post("reset-password", payload, false);
}
