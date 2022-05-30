import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Dropdown, Col, Avatar } from "antd";
import { User, Logout } from "react-iconly";
import { logout as logoutAction } from "@mods/userManagement/auth/authSlice";
import Man from "@assets/images/menu/man.svg";
import { useHistory } from "react-router-dom";

const AvatarIcon = () => {
  return <img src={Man} alt="Avatar" />;
};
export default function HeaderUser() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authUser);

  const logout = () => {
    dispatch({ type: logoutAction.type });
    history.push('/');
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="user"
        icon={
          <User
            set="curved"
            className="remix-icon da-vertical-align-middle"
            size={16}
          />
        }
      >
        Profile
      </Menu.Item>

      <Menu.Item
        key="logout"
        onClick={logout}
        icon={
          <Logout
            set="curved"
            className="remix-icon da-vertical-align-middle"
            size={16}
          />
        }
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Col className="da-d-flex-center" onClick={(e) => e.preventDefault()}>
        <Avatar src={user.profile_url} icon={<AvatarIcon />} size={40} />
      </Col>
    </Dropdown>
  );
}
