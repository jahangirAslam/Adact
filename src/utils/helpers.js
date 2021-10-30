import { notification } from "antd";

import { REQUEST_ACTIONS } from "@consts/actionTypes"

export const getErrorProps = (errors) => {
    if (Array.isArray(errors) && !errors.length) {
        return {};
    } else if (errors === null || errors === '' || errors === "" || errors === undefined) {
        return {};
    }
    return { validateStatus: 'error', help: errors };
}

export const execWithLoadingState = async (loader, call, payload, onSuccess, onError) => {
    loader(REQUEST_ACTIONS.REQUEST_IDLE);
    try {

        loader(REQUEST_ACTIONS.REQUEST_LOADING);
        let res = await call(payload);

        if (res.code === 200) {
            loader(REQUEST_ACTIONS.REQUEST_SUCCESS);
            onSuccess(res.data, res);
            return;
        } else if (res.code === 422) {
            onError(res.data, res);
        } else {
            onError([res.msg], res);
        }
        loader(REQUEST_ACTIONS.REQUEST_ERROR);

    } catch (e) {
        loader(REQUEST_ACTIONS.REQUEST_ERROR);
        onError(e.message, e);
    }
}


export const NOTIFICATION_TYPE = {
    INFO: "info",
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning",
}

export const notify = (title, message, type = NOTIFICATION_TYPE.SUCCESS) => {
    var notificationObject = notification;
    notificationObject[type]({
        message: title,
        description: message,
    });
}
