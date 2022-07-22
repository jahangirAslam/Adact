import React from "react";

import { Button, Badge, Row, Col, Dropdown, Divider, Avatar } from "antd";
import { Notification, Message, Calendar } from "react-iconly";
import { RiMoneyDollarCircleLine, RiTruckLine } from "react-icons/ri";
import {
  NotificationOutlined
 
} from '@ant-design/icons';

export default function HeaderNotifications() {
  const notificationMenu = (
    <div className="da-py-16 da-bg-color-black-0 da-border-radius da-border-1 da-border-color-black-40">
      <div className="da-px-16">
        <Row align="middle" justify="space-between">
          <Col className="da-p1-body da-font-weight-600 da-text-color-black-100 da-mr-64">
            Notifications
          </Col>

          <Col className="da-bg-color-primary-1 da-border-radius-full da-badge-text da-text-color-black-0 da-py-4 da-px-6 da-ml-24">
            4 New
          </Col>
        </Row>
      </div>

      <Divider className="da-my-16 da-mx-0 da-bg-color-black-40" />

      <div className="da-px-16">
        <Row align="middle">
          <Col className="da-mr-8">
            <Avatar size={32} icon={<NotificationOutlined />} className="da-d-flex-center-full" />
          </Col>

          <Col>
            <span className="da-d-block da-w-100 da-mb-4 da-badge-text da-font-weight-600 da-text-color-black-100">
             Lorem ipsum dolor is here
            </span>

            <span className="da-d-block da-input-description da-font-weight-600 da-text-color-black-80">
            Lorem ipsum dolor is here
            </span>
          </Col>
        </Row>
      </div>

      <Divider className="da-my-16 da-mx-0 da-bg-color-black-40" />

      <div className="da-px-16">
        <Row align="middle">
          <Col className="da-mr-8">
            <Avatar size={32} icon={<NotificationOutlined />} className="da-d-flex-center-full" />
          </Col>

          <Col>
            <span className="da-d-block da-w-100 da-mb-4 da-badge-text da-font-weight-600 da-text-color-black-100">
            Lorem ipsum dolor is here
            </span>

            <span className="da-d-block da-input-description da-font-weight-600 da-text-color-black-80">
            Lorem ipsum dolor is here
            </span>
          </Col>
        </Row>
      </div>

      <Divider className="da-my-16 da-mx-0 da-bg-color-black-40" />

      <div className="da-px-16">
        <Row align="middle">
          <Col className="da-mr-8">
            <Avatar size={32} icon={<NotificationOutlined />} className="da-d-flex-center-full" />
          </Col>

          <Col>
            <span className="da-d-block da-w-100 da-mb-4 da-badge-text da-font-weight-600 da-text-color-black-100">
            Lorem ipsum dolor is here
            </span>

            <span className="da-d-block da-input-description da-font-weight-600 da-text-color-black-80">
            Lorem ipsum dolor is here
            </span>
          </Col>
        </Row>
      </div>

      <Divider className="da-my-16 da-mx-0 da-bg-color-black-40" />

      <div className="da-px-16">
        <Row align="middle">
          <Col className="da-mr-8">
            <Avatar size={32} icon={<NotificationOutlined />} className="da-d-flex-center-full" />
          </Col>

          <Col>
            <span className="da-d-block da-w-100 da-mb-4 da-badge-text da-font-weight-600 da-text-color-black-100">
            Lorem ipsum dolor is here
            </span>

            <span className="da-d-block da-input-description da-font-weight-600 da-text-color-black-80">
            Lorem ipsum dolor is here
            </span>
          </Col>
        </Row>
      </div>

      <Divider className="da-my-16 da-mx-0 da-bg-color-black-40" />

      <div className="da-px-16">
        <Button
          type="primary"
          block
        >
          Clear all notifications
        </Button>
      </div>
    </div>
  );

  return (
    <Button
      type="text"
      icon={
        <Dropdown overlay={notificationMenu} placement="bottomRight">
          <Badge dot offset={[-4, 5]}>
            <Notification
              set="curved"
              className="noti-icon"
            />
          </Badge>
        </Dropdown>
      }
    />
  );
};