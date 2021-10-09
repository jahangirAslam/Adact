import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Button } from "antd";
import { RiArrowRightSLine } from "react-icons/ri";

import bg from "../../../../assets/images/pages/lock-screen/lock-pattern.svg";
import logo from "../../../../assets/images/logo/logo-vector-large.svg";

export default function PasswordIsChanged() {
  return (
    <Row align="top" justify="center" className="da-lock-screen da-bg-color-primary-1 da-d-flex-center">
      <div
        className="da-screen-bg"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <Row gutter={[32, 0]} className="da-lock-screen-row da-text-center da-border-radius da-overflow-hidden da-pt-64 da-pb-18">
        <Col span={24} className="da-mb-48">
          <img src={logo} alt="Logo" />
        </Col>

        <Col span={24} className="da-mb-120">
          <h3 className="da-text-color-black-0 da-mb-24">Password is changed 🔑</h3>

          <p className="da-p1-body da-text-color-black-0 da-mb-32">Your password is successfully changed. Please sign in to your account and start a new project.</p>

          <Link to="/pages/authentication/login">
            <Button
              icon={<RiArrowRightSLine className="da-text-color-primary-1 da-mr-8" size={16} />}
              className="da-text-color-primary-1 da-border-color-black-0"
            >
              Sign in
            </Button>
          </Link>

          <p className="da-p1-body da-text-color-black-0 da-mt-16 da-mb-0">Didn't receive an email? Try again</p>
        </Col>

        <Col span={24}>
          <Row justify="center">
            <Button type="link" className="da-text-color-black-0 da-py-8 da-px-sm-12 da-px-16">About Us</Button>
            <Button type="link" className="da-text-color-black-0 da-py-8 da-px-sm-12 da-px-16">Contact</Button>
            <Button type="link" className="da-text-color-black-0 da-py-8 da-px-sm-12 da-px-16">Help</Button>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}
