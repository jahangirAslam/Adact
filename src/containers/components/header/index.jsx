import React, { useState, useContext } from "react";

import { Layout, Button, Row, Col, Input } from "antd";
import { RiMenuFill } from "react-icons/ri";

import HeaderUser from "./HeaderUser";
import HeaderNotifications from "./HeaderNotifications";
import MenuLogo from "../menu/logo";
import MenuButton from "@assets/images/menu/Vector.svg";

import { AppContext } from "../../../utils/context";
import { SearchOutlined } from "@ant-design/icons";

import "./header-styles.css";

const { Header } = Layout;
const { Search } = Input;

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
