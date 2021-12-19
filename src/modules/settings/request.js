import { get, put } from "@utils/axios";

const api = "common/setting";

export const getSettingByGroup = (payload) => {
    return get(`${api}?filters={"group":"${payload}"}`);
}
export const updateSetting = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}
