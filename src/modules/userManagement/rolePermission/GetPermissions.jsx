import { useState, useEffect } from "react";

import { Collapse, Row } from "antd";
import PermissionCheckbox from "./PermissionCheckbox";

const GetPermissions = (props) => {
    const { Panel } = Collapse;
    const [permissionList, setPermissionList] = useState([]);

    useEffect(() => {
        setPermissionList(props.data.permissions);
        // eslint-disable-next-line
    }, []);


    const GetPermissions = (module) => {
        return (
            <>
                { module.map((eachModule, i) =>
                    <div className="da-my-10">
                        <Collapse key={ i }>
                            <Panel header={ eachModule.name }>
                                { eachModule.actions ?
                                    <Row>
                                        { eachModule.actions.map((action, i) =>
                                            <PermissionCheckbox index={ i } action={ action } eachModule={ eachModule } permissionList={ permissionList } data={ props.data } setPermissionList={ setPermissionList } />
                                        ) }
                                    </Row>
                                    : null }
                                { eachModule.children ? GetPermissions(eachModule.children) : null }
                            </Panel>
                        </Collapse>
                    </div>
                ) }
            </>
        );
    }

    return (
        <> { GetPermissions(props.modules) }</>
    );

}
export default GetPermissions;
