import { getRole } from "../../../roles/requests";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeRequest, notify } from "@utils/helpers";
import GetPermissions from "../../../rolePermission/GetPermissions";
import { ButtonComponent } from "@comps/components";
import { Form, Skeleton } from "antd";

const Permission = (props) => {
  const [moduleList, setModuleList] = useState([]);
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  useEffect(() => {
    makeRequest(setLoader, getRole, props.data.id, onSuccess, onError);
    // eslint-disable-next-line
  }, []);

  const onSuccess = (res) => {
    setModuleList(res);
  }

  const onError = (res) => {
    notify("Permission", res.msg);
  }

  const update = () => {
    history.push(`/user-management/roles/edit/${props.data.id}`);
  }

  if (moduleList.length === 0) {
    return <Skeleton />;
  }

  return (
    <div className="da-mr-64 da-ml-64 da-mt-48">
      <Form.Item wrapperCol={{ offset: 20 }}>
        <ButtonComponent disabled={props.disable} className="da-mr-10" type="primary" onClick={update} state={loader}>Update Permissions</ButtonComponent>
      </Form.Item>
      <GetPermissions data={moduleList} modules={moduleList.modules} disable={true} />
    </div>
  );
}

export default Permission;
