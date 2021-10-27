import React from "react";
import {Link, useLocation } from "react-router-dom";
import {Col, Form, Input, Row} from "antd";

import {ButtonComponent} from "@comps/components";
import LeftContent from "../../../../samples/pages/authentication/leftContent";
import {reset} from "../requests";


const ResetPassword = () => {
    const [form] = Form.useForm();
    const search = useLocation().search;
    const email = new URLSearchParams(search).get('email');
    const token = new URLSearchParams(search).get('token');
    const validate = {
        password: [
            {required: true, message: 'Please input your password!',},
            {min: 6, message: 'Minimum password length is 6',},
            {max: 30, message: 'Maximum password length is 30',},
        ]
    };

    const handleSubmit = async (data) => {
        await reset(data);
    }

    return <Row gutter={[32, 0]} className="da-authentication-page">
        <LeftContent/>

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
                        onFinish={handleSubmit}
                        form={form}
                    >
                        <Form.Item name="email" initialValue={email} label="Email :" className="da-mb-16" hidden="hidden">
                            <Input id="email" />
                        </Form.Item>
                        <Form.Item name="token" initialValue={token} label="token :" className="da-mb-16" hidden="hidden">
                            <Input id="token" />
                        </Form.Item>

                        <Form.Item name="password" rules={validate.password} label="Password :">
                            <Input.Password
                                id="password"
                                placeholder="At least 6 characters"
                            />
                        </Form.Item>

                        <Form.Item name="confirm_password" label="Confirm Password :" dependencies={['password']}
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please confirm your password!',
                                       },
                                       ({ getFieldValue }) => ({
                                           validator(_, value) {
                                               if (!value || getFieldValue('password') === value) {
                                                   return Promise.resolve();
                                               }

                                               return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                           },
                                       }),
                                   ]}>
                            <Input.Password
                                id="confirm-password"
                                placeholder="At least 6 characters"
                            />
                        </Form.Item>

                        <Form.Item className="da-mt-16 da-mb-8">
                            <ButtonComponent block type="primary" htmlType="submit">
                                Reset Password
                            </ButtonComponent>
                        </Form.Item>
                    </Form>

                    <div className="form-info">
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
    </Row>;
}

export default ResetPassword;
