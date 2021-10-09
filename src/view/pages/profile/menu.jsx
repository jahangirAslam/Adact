import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Col, Avatar, Badge, Menu } from "antd";
import {
  User,
  Notification,
  Activity,
  Setting,
  Password,
  Heart,
} from "react-iconly";

import menuImg from "../../../assets/images/pages/profile/menu-img.svg";
import avatar from "../../../assets/images/memoji/memoji-1.png";

export default function MenuProfile(props) {
  const menuIconClass = "remix-icon da-mr-8";

  function menuFooterItem() {
    if (props.footer !== "none") {
      return (
        <div className="da-profile-menu-footer">
          <img src={menuImg} alt="Profile Image" />
        </div>
      );
    }
  }

  function moreBtn() {
    if (props.moreBtnCheck !== "none") {
      return (
        <Col className="da-menu-header-btn da-pr-16 da-mb-12 da-text-right">
          {props.moreBtn()}
        </Col>
      );
    }
  }

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <Col flex="240px" className="da-profile-menu da-py-24">
      <div className="da-w-100">
        <div className="da-profile-menu-header da-mt-md-16 da-text-center">
          {moreBtn()}

          <Badge count={12}>
            <Avatar size={80} src={avatar} />
          </Badge>

          <h3 className="da-mt-24 da-mb-4">Dolores Bianca</h3>
          <a href="mailto:dolores@yoda.com" className="da-p1-body">
            dolores@yoda.com
          </a>
        </div>

        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          className="da-w-100 da-profile-menu-body"
        >
          <Menu.Item
            key="1"
            icon={<User set="curved" className={menuIconClass} />}
            className={`
              da-mb-16 da-pr-32
              ${splitLocation[splitLocation.length - 1] === "personel-information"
                ? "ant-menu-item-selected"
                : "ant-menu-item-selected-in-active"}
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/pages/profile/personel-information">
              Personal Information
            </Link>
          </Menu.Item>

          <Menu.Item
            key="2"
            icon={<Notification set="curved" className={menuIconClass} />}
            className={`
              da-mb-16 da-pr-32
              ${splitLocation[splitLocation.length - 1] === "notifications"
                ? "ant-menu-item-selected"
                : "ant-menu-item-selected-in-active"}
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/pages/profile/notifications">Notifications</Link>
          </Menu.Item>

          <Menu.Item
            key="3"
            icon={<Activity set="curved" className={menuIconClass} />}
            className={`
              da-mb-16 da-pr-32
              ${splitLocation[splitLocation.length - 1] === "activity"
                ? "ant-menu-item-selected"
                : "ant-menu-item-selected-in-active"}
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/pages/profile/activity">Activity Monitor</Link>
          </Menu.Item>

          <Menu.Item
            key="4"
            icon={<Setting set="curved" className={menuIconClass} />}
            className={`
              da-mb-16 da-pr-32
              ${splitLocation[splitLocation.length - 1] === "security"
                ? "ant-menu-item-selected"
                : "ant-menu-item-selected-in-active"}
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/pages/profile/security">Security Settings</Link>
          </Menu.Item>

          <Menu.Item
            key="5"
            icon={<Password set="curved" className={menuIconClass} />}
            className={`
              da-mb-16 da-pr-32
              ${splitLocation[splitLocation.length - 1] === "password-change"
                ? "ant-menu-item-selected"
                : "ant-menu-item-selected-in-active"}
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/pages/profile/password-change">Password Change</Link>
          </Menu.Item>

          <Menu.Item
            key="6"
            icon={<Heart set="curved" className={menuIconClass} />}
            className={`
              da-mb-16 da-pr-32
              ${splitLocation[splitLocation.length - 1] === "connect-with-social"
                ? "ant-menu-item-selected"
                : "ant-menu-item-selected-in-active"}
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/pages/profile/connect-with-social">
              Connect with Social
            </Link>
          </Menu.Item>
        </Menu>
      </div>

      {menuFooterItem()}
    </Col>
  );
}
