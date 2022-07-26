import Man from "@assets/images/menu/man.svg";
import { logout as logoutAction } from "@mods/userManagement/auth/authSlice";
import { Avatar, Col, Dropdown, Menu, Modal } from "antd";
import { React, useState } from "react";
import { Logout, User } from "react-iconly";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Profile from "./profile/profile";

const AvatarIcon = () => {
  return <img src={Man} alt="Avatar" />;
};
export default function HeaderUser() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authUser);
  const [childComponent, setChildComponent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const logout = () => {


    dispatch({ type: logoutAction.type });
    history.push('/');
  };
  const showModal = () => {
    history.push(`/profile/edit/26`);
    // setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const menu = (

    <Menu>
      <Menu.Item
        key="user"
        onClick={showModal}
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
    <>
      <Dropdown overlay={menu}>
        <Col className="da-d-flex-center" onClick={(e) => e.preventDefault()}>
          <Avatar src={user.profile_url} icon={<AvatarIcon />} size={40} />
        </Col>
      </Dropdown>
      <Modal
      className="ProfileModal"
        title="Profile"
        visible={visible}
       footer={null}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
     
      >
        <Profile />
      </Modal>
    </>
  );
}
