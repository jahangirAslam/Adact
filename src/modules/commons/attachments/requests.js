import { get, post, del, put } from "@utils/axios";
import axios from 'axios';

const api = "common/attachment";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getAttachmentDependencies = () => {
    return get(`${api}/dependencies`);
}

export const getAttachments = (payload) => {
    return get(api, payload);
}

export const getAttachment = (id) => {
    return get(`${api}/${id}`);
}

export const createAttachment = (payload) => {
    return post(api, payload);
}

export const downloadAttachmentRequest = (id) => {
    return get(`${api}/download/${id}`);
}

export const deleteAttachment = (id) => {
    return del(`${api}/${id}`);
}

export const uploadAttachmentRequest = (payload) => {
    return post(`${api}/upload`, payload);
}
export const updateAttachment = (payload) => {
    return put(`${api}/${payload.id}`, payload);
}

export const uploadFileS3 = (payload) => {
    axios.put(payload.url, payload.data).then((res) => {
        return res;
    });
}

export const downloadFileS3 = (payload) => {
    window.open(payload);
}



