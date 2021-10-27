import React from "react";
import {Link} from "react-router-dom";
import {Col, Form, Input, Row} from "antd";

import {ButtonComponent} from "@comps/components";
import LeftContent from "../../../../samples/pages/authentication/leftContent";
import {forget} from "../requests";


const ForgetPassword = () => {
    const [form] = Form.useForm()
    const validate = {
        email: [
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your E-mail!" },
        ]
    };

    const handleSubmit = async (data) => {
        await forget(data);
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
                    <h1 className="da-mb-sm-0">Recover Password</h1>
                    <p className="da-mt-sm-0 da-mt-8 da-text-color-black-60">
                        We’ll e-mail you instructions on how to reset your password.
                    </p>

                    <Form
                        layout="vertical"
                        name="basic"
                        className="da-mt-sm-16 da-mt-32"
                        onFinish={handleSubmit}
                        form={form}
                    >
                        <Form.Item name="email" rules={validate.email} label="E-mail :">
                            <Input id="validating" placeholder="you@example.com"/>
                        </Form.Item>

                        <Form.Item className="da-mt-16 da-mb-8">
                            <ButtonComponent block type="primary" htmlType="submit">
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

export default ForgetPassword;
