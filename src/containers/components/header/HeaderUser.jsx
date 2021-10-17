import React from "react";
import { useSelector } from 'react-redux'

import { Menu, Dropdown, Col, Avatar } from "antd";
import { User, Logout } from "react-iconly";


export default function HeaderUser() {
  const user = useSelector((state) => state.auth.authUser);

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
