import { notification } from "antd";
import moment from "moment";

export const getErrorProps = (errors) => {
  if (Array.isArray(errors) && !errors.length) {
    return {};
  } else if (
    errors === null ||
    errors === "" ||
    errors === "" ||
    errors === undefined
  ) {
    return;
  }
  return { validateStatus: "error", help: errors };
};

export const makeRequest = async (
  loader,
  call,
  payload,
  onSuccess,
  onError
) => {
  loader(true);
  try {
    let res = await call(payload);

    if (res.code === 200) {
      onSuccess(res.data, res);
    } else if (res.code === 422) {
      onError(res.data, res);
    } else {
      if (onError) {
        onError(res.data, res);
      }
    }
  } catch (e) {
    if (onError) {
      onError(e.message, e);
    }
  }
  loader(false);
};

export const makeRequestStateless = async (
  call,
  payload,
  onSuccess,
  onError
) => {
  try {
    let res = await call(payload);
    if (res.code === 200) {
      onSuccess(res.data, res);
      return;
    } else if (res.code === 422) {
      if (onError) {
        onError(res.data, res);
      }
    } else {
      if (onError) {
        onError([res.msg], res);
      }
    }
  } catch (e) {
    if (onError) {
      onError(e.message, e);
    }
  }
};

export const NOTIFICATION_TYPE = {
  INFO: "info",
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
};

export const notify = (title, message, type = NOTIFICATION_TYPE.SUCCESS) => {
  var notificationObject = notification;
  notificationObject[type]({
    message: title,
    description: message,
  });
};

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
};
export const replaceById = (data, each) => {
  return data.map((obj) => (each.id === obj.id ? each : false) || obj);
};

export const removeById = (data, id) => {
  return data.filter(function (value, index, arr) {
    return value.id !== id;
  });
};

const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const formatFullYearOnly = (date) => {
  return formatDate(date, "YYYY");
};

export const formatYearOnly = (date) => {
  return formatDate(date, "YY");
};

export const formatMonthOnly = (date) => {
  return formatDate(date, "m");
};

export const formatDayOnly = (date) => {
  return formatDate(date, "d");
};

export const formatCompleteData = (date) => {
  return formatDate(date, "MM DD, YYYY");
};

export const formatCompleteDataTime = (date) => {
  return formatDate(date, "MMMM DD, YYYY hh:mm A");
};
