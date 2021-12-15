import { post, del } from "@utils/axios";

const permissionApi = "user-management/permission";

export const createPermission = (payload) => {
    return post(permissionApi, payload);
}

export const deletePermission = (id) => {
    return del(`${permissionApi}/${id}`);
}
