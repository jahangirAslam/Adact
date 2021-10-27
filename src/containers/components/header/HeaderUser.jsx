import React from "react";
import { useDispatch, useSelector } from 'react-redux'

import { Menu, Dropdown, Col, Avatar } from "antd";
import { User, Logout } from "react-iconly";
import { logout as logoutAction } from "@mods/userManagement/auth/authSlice";

export default function HeaderUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authUser);

  const logout = () => {
      dispatch({type:logoutAction.type});
  }


  const menu = (
    <Menu>
      <Menu.Item
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
        <Avatar src={user.profile_url} size={40} />
      </Col>
    </Dropdown>
  );
};
