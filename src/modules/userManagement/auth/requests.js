import { post } from "@utils/axios";

export const login = (payload) => {
    return post("auth/login", payload, false);
}
