import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import { Row, Col, Drawer, Button, Dropdown, Menu } from "antd";
import { RiMore2Line, RiMenuFill, RiCloseFill } from "react-icons/ri";

import Breadcrumbs from "../../../layout/components/content/breadcrumbs";
import ActionButton from "../../../layout/components/content/action-button";
import InfoProfile from "./personel-information";
import NotificationsProfile from "./notifications";
import MenuProfile from "./menu";
import ActivityProfile from "./activity";
import SecurityProfile from "./security";
import PasswordProfile from "./password-change";
import SocialProfile from "./connect-with-social";

export default function Profile() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const rateMenu = (
    <Menu>
      <Menu.Item key="0">Change Avatar</Menu.Item>
    </Menu>
  );

  function moreBtn() {
    return (
      <Dropdown overlay={rateMenu} placement="bottomLeft">
        <Button
          type="text"
          icon={<RiMore2Line className="da-text-color-black-100" size={24} />}
        ></Button>
      </Dropdown>
    );
  }

  return (
    <Row gutter={[32, 32]} className="da-mb-32">
      <Drawer
        title={moreBtn()}
        className="da-profile-mobile-menu"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        closeIcon={
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        }
      >
        <MenuProfile
          onCloseDrawer={onClose}
          moreBtnCheck="none"
          footer="none"
        />
      </Drawer>

      <Col span={24}>
        <Row gutter={[32, 32]} justify="space-between">
          <Breadcrumbs breadCrumbParent="Pages" breadCrumbActive="Profile" />

          <ActionButton />
        </Row>
      </Col>

      <Col span={24}>
        <Row className="da-profile-mobile-menu-btn da-bg-color-black-0 da-border-radius da-py-12 da-px-sm-8 da-px-24 da-mb-16">
          <Button
            className="da-p-0"
            type="text"
            icon={
              <RiMenuFill
                size={24}
                className="remix-icon da-text-color-black-80"
              />
            }
            onClick={showDrawer}
          ></Button>
        </Row>

        <Row className="da-bg-color-black-0 da-border-radius da-pr-sm-16 da-pr-32">
          <MenuProfile moreBtn={moreBtn} />

          <Col
            flex="1 1"
            className="da-pl-sm-16 da-pl-32 da-py-sm-24 da-py-32 da-pb-24 da-overflow-hidden"
          >
            <Switch>
              <Route path="/pages/profile/personel-information" exact>
                <InfoProfile />
              </Route>

              <Route path="/pages/profile/notifications">
                <NotificationsProfile />
              </Route>

              <Route path="/pages/profile/activity">
                <ActivityProfile />
              </Route>

              <Route path="/pages/profile/security">
                <SecurityProfile />
              </Route>

              <Route path="/pages/profile/password-change">
                <PasswordProfile />
              </Route>

              <Route path="/pages/profile/connect-with-social">
                <SocialProfile />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}