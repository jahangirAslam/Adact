import { getRole } from "../../../roles/requests";
import React, { useState, useEffect } from "react";

import { makeRequest, notify } from "@utils/helpers";
import GetPermissions from "../../../rolePermission/GetPermissions";
import { Skeleton } from "antd";

const Permission = (props) => {
  const [moduleList, setModuleList] = useState([]);

  useEffect(() => {
    makeRequest(Function, getRole, props.data.id, onSuccess, onError);
    // eslint-disable-next-line
  }, []);

  const onSuccess = (res) => {
    setModuleList(res);
  }

  const onError = (error, msg) => {
    notify(msg.message);
  };

  if (moduleList.length === 0) {
    return <Skeleton />;
  }

  return (
    <GetPermissions data={moduleList} modules={moduleList.modules} />
  );
}

export default Permission;
