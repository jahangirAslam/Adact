import { Button } from "antd";
import { LoadingOutlined, CheckOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons';
import { REQUEST_ACTIONS } from "@consts/ActionTypes";


const BaseButton = (props) => {
    let icon = props.children;

    if (props.state === REQUEST_ACTIONS.REQUEST_PENDING) {
        return (
            <Button {...props} disabled>
                <span className="dot-collision gx-mr-3 gx-ml-3"></span>
            </Button>
        );
    }
    if (props.state === REQUEST_ACTIONS.REQUEST_LOADING) {
        <Button {...props} disabled>
            <LoadingOutlined />
        </Button>
    }
    if (props.state === REQUEST_ACTIONS.REQUEST_SUCCESS) { icon = <CheckOutlined />; }
    if (props.state === REQUEST_ACTIONS.REQUEST_ERROR) { icon = <CloseOutlined />; }
    if (props.disabled) { icon = <StopOutlined />; }

    return (
        <Button {...props} >
            <span></span>
            {icon}
        </Button>
    );
};

export default BaseButton;
