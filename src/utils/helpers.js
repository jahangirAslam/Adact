import { notification } from "antd";
import moment from "moment";

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

export const execWithoutState = async (call, payload, onSuccess, onError) => {
    try {
        let res = await call(payload);
        if (res.code === 200) {
            onSuccess(res.data, res);
            return;
        } else if (res.code === 422) {
            onError(res.data, res);
        } else {
            onError([res.msg], res);
        }
    } catch (e) {
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

let all_permissions = [];
export const hasPermission = (key) => {
    if (process.env.REACT_APP_ENV === "local") {
        return true;
    }

    if (!all_permissions.length) {
        all_permissions = JSON.parse(localStorage.getItem("moduleList"));
    }

    if (!all_permissions) {
        all_permissions = [];
        return false;
    }

    if (key === "always") {
        return true;
    }

    return !all_permissions.indexOf(`${key}`);
}

const formatDate = (date, format) => {
    return moment(date).format(format);;
}

export const formatFullYearOnly = (date) => {
    return formatDate(date, 'YYYY');;
}

export const formatYearOnly = (date) => {
    return formatDate(date, 'YY');;
}

export const formatMonthOnly = (date) => {
    return formatDate(date, 'm');;
}

export const formatDayOnly = (date) => {
    return formatDate(date, 'd');;
}

export const formatCompleteData = (date) => {
    return formatDate(date, 'MM DD, YYYY');;
}

export const formatCompleteDataTime = (date) => {
    return formatDate(date, 'MMMM DD, YYYY hh:mm A');;
}
