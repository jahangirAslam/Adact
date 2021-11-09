import { Button } from "antd";
import { LoadingOutlined, CheckOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons';
import { REQUEST_ACTIONS } from "@consts/actionTypes";


const BaseButton = (props) => {
  let text = props.children;
  let icon = null;

  if (props.state === REQUEST_ACTIONS.REQUEST_LOADING) {
    return (
      <Button {...props} disabled>
        <LoadingOutlined />
      </Button>
    );
  }
  if (props.state === REQUEST_ACTIONS.REQUEST_SUCCESS) { icon = <CheckOutlined />; }
  if (props.state === REQUEST_ACTIONS.REQUEST_ERROR) { icon = <CloseOutlined />; }
  if (props.disabled) { icon = <StopOutlined />; }

  return (
    <Button {...props} >
      <span>{text} </span>
      {icon}
    </Button>
  );
};

export default BaseButton;
