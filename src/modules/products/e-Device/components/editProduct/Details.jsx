import React, { useState } from "react";
import { Form, Input, Row, Col, Divider, Switch, Select, Radio } from "antd";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { ButtonComponent } from "@comps/components";
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
                        name="name"
                        rules={rules.name}
                        label="Product Name :"
                        {...getErrorProps(errors["name"])}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="type_id" label="Type ID :">
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="ecid" label="EC_ID(EU) :">
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="category_id" label="category_id :">
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item
                        name="upload"
                        label="Change Image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
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
                    Save Update
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
