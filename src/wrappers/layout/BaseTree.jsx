
import { Tree } from "antd";

const BaseTree = (props) => {
    return (
        <Tree
                    selectable={false}
                    showLine={true}
                    treeData={props.data}
                    expandedKeys={props.expandedKeys}
                    onExpand={(keys) => {
                        props.setExpandedKeys(keys);
                    }}
                    titleRender={props.treeRenderer}
                />

    );
}
export default BaseTree;
