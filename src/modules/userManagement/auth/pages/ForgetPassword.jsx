import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Form, Input, Row } from "antd";

import { ButtonComponent } from "@comps/components";
import { execWithLoadingState, getErrorProps, notify } from "@utils/helpers";

import AuthCommon from "../components/AuthCommon";
import { forget } from "../requests";


const ForgetPassword = () => {

  const history = useHistory();
  const [loader, setLoader] = useState('');
  const [errors, setErrors] = useState([]);

  const onFinish = (payload) => {
    execWithLoadingState(setLoader, forget, payload, onSuccess, onError);
  }

  const onSuccess = (data, res) => {
    notify("Password Reset", res.msg);
    history.push("/");
  }

  const onError = (err) => {
    let errors = [];
    errors['email'] = err;
    setErrors(errors);
  }

  return (
    <Row gutter={[32, 0]} className="da-authentication-page">
      <AuthCommon />

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
              onFinish={onFinish}
            >
              <Form.Item name="email" rules={rules.email} label="Email :"
                {...getErrorProps(errors['email'])}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>

              <Form.Item className="da-mt-16 da-mb-8">
                <ButtonComponent block type="primary" htmlType="submit" state={loader}>
                  Reset Password
                </ButtonComponent>
              </Form.Item>
            </Form>

            <div className="da-form-info">
              <span className="da-text-color-black-80 da-caption da-mr-4">
                Go back to
              </span>

              <Link
                to="/"
                className="da-text-color-primary-1 da-caption"
              >
                Login
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default ForgetPassword;

const rules = {
  email: [
    { type: "email", message: "The input is not valid email!" },
    { required: true, message: "Please input your email!" },
  ]
};
