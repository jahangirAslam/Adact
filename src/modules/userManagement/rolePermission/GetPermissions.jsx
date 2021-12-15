import { useState, useEffect } from "react";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { createPermission, deletePermission } from "./requests";
import { Checkbox, Collapse, Row, Col } from "antd";

const GetPermissions = (props) => {
    const { Panel } = Collapse;
    const [permissionList, setPermissionList] = useState([]);

    useEffect(() => {
        setPermissionList(props.data.permissions);
        // eslint-disable-next-line
    }, []);

    const onPermissionCreateSuccess = (res, response) => {
        setPermissionList([...permissionList, res.object]);
        notify("Permission", response.msg);
    }

    const onPermissionDeleteSuccess = (res, response) => {
        setPermissionList(removeById(permissionList, res.id));
        notify("Permission", response.msg);
    }

    const onPermissionError = (res, response) => {
        notify("Permission", res.message);
    }

    const checkPermission = (permission, module, action) => {
        return permission.filter(x => x.role_id === props.data.object.id && x.module_id === module && x.action_id === action);
    }

    const permission = async (action, module, event, permission) => {
        let payload = { "object": { "role_id": props.data.object.id, "module_id": module.id, "action_id": action.id } };
        if (event.currentTarget.checked) {
            makeRequest(Function, createPermission, payload, onPermissionCreateSuccess, onPermissionError);
        } else {
            var index = checkPermission(permission, payload.object.module_id, payload.object.action_id);
            index.length < 1 ? notify("Permission", "Permission not found") :
                makeRequest(Function, deletePermission, index[0].id, onPermissionDeleteSuccess, onPermissionError);
        }
    }

    const GetPermissions = (module) => {
        return (
            <>
                {module.map((eachModule, i) =>
                    <div className="da-my-10">
                        <Collapse key={i}>
                            <Panel header={eachModule.name}>
                                {eachModule.actions ?
                                    <Row>
                                        {eachModule.actions.map((action, i) =>
                                            // It should be a separate component
                                            <Col span={4} key={i}><Checkbox disabled={props.disable} checked={checkPermission(permissionList, eachModule.id, action.id).length > 0 ? true : false} onClick={(event) => permission(action, eachModule, event, permissionList)}> {action.name}</Checkbox></Col>
                                        )}
                                    </Row>
                                    : null}
                                {eachModule.children ? GetPermissions(eachModule.children) : null}
                            </Panel>
                        </Collapse>
                    </div>
                )}
            </>
        );
    }

    return (
        <> {GetPermissions(props.modules)}</>
    );

}
export default GetPermissions;
