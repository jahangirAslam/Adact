import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../request";

const Details = (props) => {
    const [loader, setLoader] = useState("");
    const [errors, setErrors] = useState([]);

    const onFinish = (payload) => {
        payload.id = props.data.id;
        makeRequest(setLoader, updateSubstance, payload, onSuccess, onError);
    };

    const onSuccess = (data, res) => {
        notify("Substance", res.msg);
    };

    const onError = (err) => {
        let errorList = [];
        errorList["password"] = err;
        setErrors(errorList);
    };

    // const onChange = (e) => {
    //   console.log("radio checked", e.target.value);
    //   setValue(e.target.value);
    // };

    return (
        <Form
            layout="vertical"
            // labelCol={{ span: 7 }}
            initialValues={props.data}
            onFinish={onFinish}
        >
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" xs={24} md={12} lg={8} >
                    <Form.Item
                        name="type"
                        rules={rules.name}
                        label="Name :"
                        {...getErrorProps(errors["name"])}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="test_ref" label="Test_ref :">
                        <Input />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="status" label="status :">
                        <Input />
                    </Form.Item>
                </Col>


            </Row>

            <Form.Item style={{ textAlign: "end" }}>
                <ButtonComponent
                    className="da-mr-10"
                    type="primary"
                    htmlType="submit"
                    state={loader}
                >
                    Save 
                </ButtonComponent>
            </Form.Item>
        </Form>
    );
};

export default Details;

const rules = {
    name: [
        { required: true, message: "Please input your password!" },
        { min: 3, message: "Minimum password length is 3" },
        { max: 100, message: "Maximum password length is 100" },
    ],
    role_id: [{ required: true, message: "Please select user role!" }],
    company_id: [{ required: true, message: "Please select user third party!" }],
};
