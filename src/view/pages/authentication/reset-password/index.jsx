import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Form, Input, Button } from "antd";

import LeftContent from "../leftContent";

export default function ResetPassword() {
  return (
    <Row gutter={[32, 0]} className="da-authentication-page">
      <LeftContent />

      <Col md={12}>
        <Row className="da-h-100" align="middle" justify="center">
          <Col
            xxl={11}
            xl={15}
            lg={20}
            md={20}
            sm={24}
            className="da-px-sm-8 da-pt-24 da-pb-48"
          >
            <h1>Reset Password</h1>
            <p className="da-mt-8 da-text-color-black-60">
              Email verification is done. Please choose another password
            </p>

            <Form
              layout="vertical"
              name="basic"
              className="da-mt-sm-16 da-mt-32"
            >
              <Form.Item label="Password :">
                <Input.Password
                  id="password"
                  placeholder="At least 6 characters"
                />
              </Form.Item>

              <Form.Item label="Confirm Password :">
                <Input.Password
                  id="confirm-password"
                  placeholder="At least 6 characters"
                />
              </Form.Item>

              <Form.Item className="da-mt-16 da-mb-8">
                <Button block type="primary" htmlType="submit">
                  Reset Password
                </Button>
              </Form.Item>
            </Form>

            <div className="form-info">
              <span className="da-text-color-black-80 da-caption da-mr-4">
                Go back to
              </span>

              <Link
                to="/pages/authentication/login"
                className="da-text-color-primary-1 da-caption"
              >
                Login
              </Link>
            </div>

            <div className="da-other-links da-mt-24">
              <a href="#" className="da-text-color-black-80">
                Privacy Policy
              </a>
              <a href="#" className="da-text-color-black-80">
                Term of use
              </a>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
