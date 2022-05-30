import { Col } from "antd";
import loginImg from "../../../../assets/images/dasboard/loginImg.png";
const AuthCommon = () => (
  <Col   lg={12} span={24} className="da-bg-color-primary-4 da-position-relative login-img">
    <img src={loginImg} height="100%" alt="" />
  </Col>
);

export default AuthCommon;
