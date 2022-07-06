import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, Form, Input, Row, Switch } from "antd";
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
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
      };

    return (
        <Form
            layout="vertical"
            // labelCol={{ span: 7 }}
            initialValues={props.data}
            onFinish={onFinish}
        >
             <Row gutter={[16, 24]}>
             <Col className="gutter-row" xs={24} md={24} >
                <h5>Summary</h5>
            </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8} >
                    <Form.Item
                        name="type"
                        rules={rules.name}
                        label="Manufacturer :"
                        {...getErrorProps(errors["name"])}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                
                    <Form.Item name="test_ref" label="Product :">
                        <Input />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" xs={24} md={12} lg={8}>
                    <Form.Item name="status" label="Test Type :">
                        <Input />
                    </Form.Item>
                </Col>


            </Row> 

            <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} md={24} >
                <h5>Testing</h5>
            </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8} >
                    <Form.Item
                        name="type"
                        rules={rules.name}
                        label="Laboratory :"
                        {...getErrorProps(errors["name"])}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                
                    <Form.Item name="test_ref" label="Faculty :">
                        <Input />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" xs={24} md={12} lg={8}>
                   
                </Col>


            </Row> 
            <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} md={24} >
                <h5>Status</h5>
            </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8} >
                    <Form.Item
                        name="type"
                        rules={rules.name}
                        label="Created On :"
                        {...getErrorProps(errors["name"])}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                
                    <Form.Item name="test_ref" label="Created By :">
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                </Col>

                <Col className="gutter-row" xs={24} md={12} lg={8}>
                { <Form.Item name="approved" label="Approved :">
                       <Switch defaultChecked onChange={onChange} />;

                    </Form.Item> }
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8} >
                    <Form.Item
                        name="type"
                        rules={rules.name}
                        label="Authorised on :"
                        {...getErrorProps(errors["name"])}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                
                    <Form.Item name="test_ref" label="Authorised By :">
                        <Input />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" xs={24} md={12} lg={12}>
                <Form.Item name="test_ref" label="Last Update On  :">
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                <Form.Item name="test_ref" label="Last Update By :">
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
