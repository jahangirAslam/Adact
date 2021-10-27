import React from "react";

import { Layout, Button, Row, Col } from "antd";
import { RiMenuFill } from "react-icons/ri";

import HeaderUser from "./HeaderUser";
import HeaderNotifications from "./HeaderNotifications";

const { Header } = Layout;

export default function MenuHeader(props) {
  const { setVisible } = props;

  // Mobile Sidebar
  const showDrawer = () => {
    setVisible(true);
  };

  return (
    <Header>
      <Row
        className="da-w-100 da-position-relative"
        align="right"
        justify="end"
      >
        <Col className="da-mobile-sidebar-button da-mr-24">
          <Button
            className="da-mobile-sidebar-button"
            type="text"
            onClick={showDrawer}
            icon={
              <RiMenuFill
                size={24}
                className="remix-icon da-text-color-black-80"
              />
            }
          />
        </Col>

        <Col>
          <Row align="middle">

            <Col className="da-d-flex-center da-mr-sm-12 da-mr-16">
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
};
