import { get, post, del, put } from "@utils/axios";
import axios from 'axios';

const api = "document-management/documents";

export const getFilters = () => {
    return get(`${api}/filters`);
}

export const getDocumentDependencies = () => {
    return get(`${api}/dependencies`);
}

export const getDocuments = (payload) => {
    return get(api, payload);
}

export const getDocument = (id) => {
    return get(`${api}/${id}`);
}

export const createDocument = (payload) => {
    return post(api, payload);
}

export const downloadDocumentRequest = (id) => {
    return get(`${api}/download/${id}`);
}

export const deleteDocument = (id) => {
    return del(`${api}/${id}`);
}

export const uploadDocumentRequest = (payload) => {
    return post(`${api}/upload`, payload);
}
export const updateDocument = (payload) => {
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



