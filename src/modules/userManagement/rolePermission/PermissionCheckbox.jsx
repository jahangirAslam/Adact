import { useState } from "react";
import { Checkbox, Col } from "antd";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { createPermission, deletePermission } from "./requests";


const PermissionCheckbox = (props) => {
    const [loader, setLoader] = useState(true);

    const onPermissionCreateSuccess = (res, response) => {
        props.setPermissionList([...props.permissionList, res.object]);
        notify("Permission", response.msg);
    }

    const onPermissionDeleteSuccess = (res, response) => {
        props.setPermissionList(removeById(props.permissionList, res.id));
        notify("Permission", response.msg);
    }

    const onPermissionError = (res, response) => {
        notify("Permission", res.message);
    }

    const permission = async (action, module, event, permission) => {
        let payload = { "object": { "role_id": props.data.object.id, "module_id": module.id, "action_id": action.id } };
        if (event.currentTarget.checked) {
            makeRequest(setLoader, createPermission, payload, onPermissionCreateSuccess, onPermissionError);
        } else {
            var index = checkPermission(permission, payload.object.module_id, payload.object.action_id);
            index.length < 1 ? notify("Permission", "Permission not found") :
                makeRequest(setLoader, deletePermission, index[0].id, onPermissionDeleteSuccess, onPermissionError);
        }
    }

    const checkPermission = (permission, module, action) => {
        return permission.filter(x => x.role_id === props.data.object.id && x.module_id === module && x.action_id === action);
    }

    return (
        <Col span={ 4 } key={ props.index }><Checkbox disabled={ props.disable } checked={ checkPermission(props.permissionList, props.eachModule.id, props.action.id).length > 0 ? true : false } onClick={ (event) => permission(props.action, props.eachModule, event, props.permissionList) } loader={ loader }> { props.action.name }</Checkbox></Col>
    );
}

export default PermissionCheckbox;