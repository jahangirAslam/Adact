import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Col, Form, Input, Row } from "antd";

import { getErrorProps, notify } from "@utils/helpers";
import { ButtonComponent } from "@comps/components";

import { signinUser } from "../authSlice";
import AuthCommon from "../components/AuthCommon";
import loginLogo from '../../../../assets/images/logo/logo.png'

let credentials = {};

const Login = () => {

  const dispatch = useDispatch();
  const { loaderState, errors, otpRequired } = useSelector((state) => state.auth);

  const handleLoginSubmit = (data) => {
    credentials.email = data.email;
    credentials.password = data.password;
    dispatch(signinUser(credentials))
  }

  const handleOtpRegenerate = () => {
    delete credentials.otp;
    dispatch(signinUser(credentials))
    notify('Regenerated OTP', 'Otp has been regenerated successfully.');
  }

  const handleOtpSubmit = (data) => {
    credentials.otp = data.otp;
    dispatch(signinUser(credentials))
  }

  const LoginForm = () => (
    <div className="" >
      <Row justify="center" align="top">

        <img src={loginLogo} alt="" />
      </Row>
      <Row justify="center" align="top" >
        <p className=" da-mt-36 da-mb-sm-48 da-text-color-black-60 login-note ">
          Welcome back, please login to your account.
        </p>
      </Row >

      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        className="da-mt-sm-16 da-mt-32 login-form"
        onFinish={handleLoginSubmit}
      >
        <Form.Item name="email" rules={rules.email} label="Username" className="da-mb-16 login-form-item"
          {...getErrorProps(errors['email'])}>
          <Input />
        </Form.Item>

        <Row align="middle" justify="end">

          <Link
            className="da-button da-text-color-black-80 "
            to="/forget-username"
          >
            <p> Forgot your username?</p>
          </Link>
        </Row>
        <Form.Item name="password" rules={rules.password} label="Password" className="da-mb-8 login-form-item"
          {...getErrorProps(errors['password'])}>
          <Input.Password />
        </Form.Item>

        <Row align="middle" justify="space-between">
          <Form.Item className="da-mb-0">
            <Checkbox name="remember"> <span className="rem-me da-ml-4" > Remember me</span></Checkbox>
          </Form.Item>

          <Link
            className="da-button da-text-color-black-80"
            to="/forget-password"
          >
            <p>
              Forgot your Password?
            </p>
          </Link>
        </Row>

        <Form.Item className="da-mt-16 da-mb-8 sign-in-btn ">
          <ButtonComponent block type="primary" htmlType="submit" state={loaderState}>
            Login
          </ButtonComponent>
        </Form.Item>
      </Form>
    </div>
  );

  const OtpForm = () => (
    <>
      <h1 className="da-mb-sm-0">Login</h1>
      <p className="da-mt-sm-0 da-mt-8 da-text-color-black-60">
        An OTP has been sended to your email.
      </p>
      <Form
        layout="vertical"
        name="basic"
        className="da-mt-sm-16 da-mt-32"
        onFinish={handleOtpSubmit}
      >
        <Form.Item name="otp" rules={rules.otp} label="Otp :" className="da-mb-16"
          {...getErrorProps(errors['email'])}>
          <Input />
        </Form.Item>

        <Form.Item className="da-mt-16 da-mb-8">
          <ButtonComponent block type="primary" htmlType="submit" state={loaderState}>
            Submit
          </ButtonComponent>
        </Form.Item>
        <Form.Item className="da-mt-16 da-mb-8">
          <ButtonComponent block type="secondary" onClick={handleOtpRegenerate} state={loaderState}>
            Resend
          </ButtonComponent>
        </Form.Item>
      </Form>
    </>
  );

  return <Row gutter={[32, 0]} className="da-authentication-page login-page"  >
    <AuthCommon />

    <Col lg={12} span={24} className="da-py-sm-0 da-py-md-64">
      <Row className="da-h-100" align="" justify="center">
        <Col
          xxl={11}
          xl={15}
          lg={20}
          md={20}
          sm={24}
          className="da-px-sm-8 da-pt-24 da-pb-48 login-screen"
        >
          {otpRequired ? <OtpForm /> : <LoginForm />}
        </Col>
      </Row>
    </Col>
  </Row>;
}

export default Login;

const rules = {
  email: [
    { type: "email", message: "The input is not valid email!" },
    { required: true, message: "Please input your email!" },
  ],
  password: [
    { required: true, message: 'Please input your password!', },
    { min: 6, message: 'Minimum password length is 6', },
    { max: 30, message: 'Maximum password length is 30', },
  ],
  otp: [
    { required: true, message: 'Please input your password!', },
    { min: 6, message: 'Minimum password length is 6', },
    { max: 6, message: 'Maximum password length is 6', },
  ]
};
