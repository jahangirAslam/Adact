import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Form, Input, Button } from "antd";

import LeftContent from "../leftContent";

export default function RecoverPassword() {
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
            <h1 className="da-mb-sm-0">Recover Password</h1>
            <p className="da-mt-sm-0 da-mt-8 da-text-color-black-60">
              We’ll e-mail you instructions on how to reset your password.
            </p>

            <Form
              layout="vertical"
              name="basic"
              className="da-mt-sm-16 da-mt-32"
            >
              <Form.Item label="E-mail :">
                <Input id="validating" placeholder="you@example.com" />
              </Form.Item>

              <Form.Item className="da-mt-16 da-mb-8">
                <Button block type="primary" htmlType="submit">
                  <Link to="/pages/authentication/reset-password">Reset Password</Link>
                </Button>
              </Form.Item>
            </Form>

            <div className="da-form-info">
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
