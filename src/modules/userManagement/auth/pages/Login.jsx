import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Col, Form, Input, Row } from "antd";

import { getErrorProps } from "@utils/helpers";
import { ButtonComponent } from "@comps/components";

import { signinUser } from "../authSlice";
import AuthCommon from "../components/AuthCommon";


const Login = () => {

    const dispatch = useDispatch();
    const { loaderState, errors } = useSelector((state) => state.auth);

    const handleSubmit = (data) => {
        dispatch(signinUser(data))
    }

    return <Row gutter={[32, 0]} className="da-authentication-page">
        <AuthCommon />

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
                        <Form.Item name="email" rules={rules.email} label="Email :" className="da-mb-16"
                            {...getErrorProps(errors['email'])}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="password" rules={rules.password} label="Password :" className="da-mb-8"
                            {...getErrorProps(errors['password'])}>
                            <Input.Password />
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
                            <ButtonComponent block type="primary" htmlType="submit" state={loaderState}>
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

const rules = {
    email: [
        { type: "email", message: "The input is not valid email!" },
        { required: true, message: "Please input your email!" },
    ],
    password: [
        { required: true, message: 'Please input your password!', },
        { min: 6, message: 'Minimum password length is 6', },
        { max: 30, message: 'Maximum password length is 30', },
    ]
};
