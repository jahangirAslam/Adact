import { UploadOutlined } from '@ant-design/icons';
import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../request";
import adact1 from '../../../../../assets/images/adact1.png'

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
    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
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
                    <Form.Item name="type_id" label="Type :">
                        <Select
                            showSearch
                            placeholder="Product category   "
                            options={props.dependencies.e_types}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="ecid" label="EC_ID(EU) :">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="product_categories" label="Overwrite last 5 digitsEC-Id() :">
                    <Input  />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="fda_tobacco" label="Tobaco Product No :">
                    <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="agents" label="Agent :">
                        <Select
                            showSearch
                            placeholder="Representative   "
                            options={props.dependencies.agents}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                <div className="logoAdact">
            <img src={adact1} alt="Logo"  />
            </div>
            <div>
            <input type="file" id="actual-btn" hidden/>
            <label for="actual-btn" className="label">Change</label>
            </div>

                    
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
