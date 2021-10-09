import React from "react";

import { Row, Col, Input, Button, Tag } from "antd";
import { User } from "react-iconly";
import { RiSettings3Line } from "react-icons/ri";

import bg from "../../../../assets/images/pages/lock-screen/lock-pattern.svg";
import logo from "../../../../assets/images/logo/logo-vector.svg";
import avatar from "../../../../assets/images/memoji/memoji-2.svg";

export default function Lock() {
  return (
    <Row justify="center" className="da-lock-screen da-bg-color-primary-1 da-d-flex-center">
      <div
        className="da-screen-bg"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <Col span={24}>
        <div className="da-mb-sm-32 da-mb-64 da-text-center">
          <img src={logo} alt="Logo" />
        </div>

        <Row gutter={[32, 0]} justify="center" className="da-lock-screen-row da-m-auto da-text-center da-border-radius da-overflow-hidden da-pt-42 da-pb-64 da-px-sm-8 da-px-24">
          <Col span={24}>
            <img src={avatar} alt="Avatar" />
          </Col>

          <Col span={24} className="da-mt-12">
            <Tag
              className="da-d-inline-flex da-align-items-center da-mr-0"
              icon={<User className="remix-icon" size={12} />}
              color="error"
            >
              Locked
          </Tag>
          </Col>

          <Col span={24} className="da-mt-24">
            <h3 className="da-text-color-black-0 da-mb-0">Edward Yıldırım</h3>
            <a href="mailto:edward@Hypeople.com" className="da-p1-body da-text-color-black-0 da-mb-0">edward@Hypeople.com</a>
          </Col>

          <Col lg={22} span={24} className="da-mt-32">
            <Input size="large" prefix={<User set="curved" className="remix-icon" size={16} />} addonAfter={<RiSettings3Line className="remix-icon" />} placeholder="Enter your pin" />
          </Col>

          <Col span={24} className="da-mt-18">
            <Button type="link" className="da-text-color-black-60">
              I forgot my pin
          </Button>
          </Col>

          <Col span={24}>
            <Button type="link" className="da-text-color-black-60">
              Sign-in options
          </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}