import React from "react";
import { Link } from "react-router-dom";
import { Checkbox, Col, Form, Input, Row } from "antd";

import { signinUser } from "../authSlice"
import { useDispatch } from "react-redux";
import { ButtonComponent } from "@comps/components";


const Login = () => {
    const dispatch = useDispatch();
    const validate = {
        email: [
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your E-mail!" },
        ],
        password: [
            {required: true, message: 'Please input your password!',},
            {min: 6, message: 'Minimum password length is 6',},
            {max: 30, message: 'Maximum password length is 30',},
        ]
    };

    const handleSubmit = (data) => {
        dispatch(signinUser(data))
    }

    return <Row gutter={[32, 0]} className="da-authentication-page">
        <Col lg={12} span={24} className="da-bg-color-primary-4 da-position-relative">
            <Row className="da-image-row da-h-100 da-px-sm-8 da-px-md-16 da-pb-sm-32 da-pt-md-96 da-pt-md-32">
                <Col className="da-logo-item da-m-sm-16 da-m-md-32 da-m-64">
                </Col>

                <Col span={24}>
                    <Row align="middle" justify="center" className="da-h-100">
                        <Col md={20} span={24} className="da-bg-item da-text-center da-mb-md-32">
                        </Col>

                        <Col xl={18} span={24} className="da-text-item da-text-center">
                            <h2 className="da-text-color-primary-1 da-mx-lg-16 da-mb-16">Very good works are  waiting for you 🤞</h2>

                            <p className="da-mb-0 da-text-color-black-80">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>

        <Col lg={12} span={24} className="da-py-sm-0 da-py-md-64">
            <Row className="da-h-100" align="middle" justify="center">
                <Col
                    xxl={11}
                    xl={15}
                    lg={20}
                    md={20}
                    sm={24}
                    className="da-px-sm-8 da-pt-24 da-pb-48"
                >
                    <h1 className="da-mb-sm-0">Login</h1>
                    <p className="da-mt-sm-0 da-mt-8 da-text-color-black-60">
                        Welcome back, please login to your account.
                    </p>

                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        className="da-mt-sm-16 da-mt-32"
                        onFinish={handleSubmit}
                    >
                        <Form.Item name="email" rules={validate.email} label="Email :" className="da-mb-16">
                            <Input id="error" />
                        </Form.Item>

                        <Form.Item name="password" rules={validate.password} label="Password :" className="da-mb-8">
                            <Input.Password id="warning2" />
                        </Form.Item>

                        <Row align="middle" justify="space-between">
                            <Form.Item className="da-mb-0">
                                <Checkbox name="remember">Remember me</Checkbox>
                            </Form.Item>

                            <Link
                                className="da-button da-text-color-black-80"
                                to="/forget-password"
                            >
                                Forgot Password?
                            </Link>
                        </Row>

                        <Form.Item className="da-mt-16 da-mb-8">
                            <ButtonComponent block type="primary" htmlType="submit">
                                Sign in
                            </ButtonComponent>
                        </Form.Item>
                    </Form>

                </Col>
            </Row>
        </Col>
    </Row>;
}

export default Login;
