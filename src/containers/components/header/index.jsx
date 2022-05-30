import MenuButton from "@assets/images/menu/Vector.svg";
import { Button, Col, Layout, Row } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../../utils/context";
import MenuLogo from "../menu/logo";
import "./header-styles.css";
import HeaderNotifications from "./HeaderNotifications";
import HeaderUser from "./HeaderUser";





const { Header } = Layout;
// const { Search } = Input;

export default function MenuHeader(props) {
  const { setVisible } = props;
  const { collapsed, setCollapsed } = useContext(AppContext);
  // Mobile Sidebar
  const showDrawer = () => {
    setVisible(true);
  };

  // Menu
  function toggle() {
    setCollapsed(!collapsed);
  }


  return (
    <Header className={"headerStyle top-header"}>
      <Row
        gutter={30}
        className="da-w-100 da-position-relative main-row"
        align="middle"
        justify="space-between"
      >
        <Col xs={14} sm={8} md={7} xl={4}>
          <Row align="middle" justify="space-between">
            <MenuLogo />
            <Button
              onClick={window.innerWidth > 1194 ? toggle : showDrawer}
              type="text"
              className="da-float-right menu-btn"
            >
              <img className="menu-btn" src={MenuButton} alt="logo" />
            </Button>
          </Row>
        </Col>
        <Col xs={10} xl={20}>
          <Row align="middle" justify="end">

            <Col className="da-d-flex-center ">
              <HeaderNotifications />
            </Col>

            <Col>
              <HeaderUser />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
}
