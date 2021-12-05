import { Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';


const BaseButton = (props) => {
  let text = props.children;
  let icon = null;

  if (props.state) {
    return (
      <Button {...props} disabled>
        <LoadingOutlined />
      </Button>
    );
  }

  return (
    <Button {...props} >
      <span>{text} </span>
      {icon}
    </Button>
  );
};

export default BaseButton;
