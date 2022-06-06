import React, { useState } from "react";
import { Form, Input, Row, Col, Divider, Switch, Select } from "antd";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { updateChemicalCompound } from "../../requests";
import { ButtonComponent } from "@comps/components";

const BasicInformation = (props) => {
  const [loader, setLoader] = useState("");
  const [errors, setErrors] = useState([]);
  const onFinish = (payload) => {
    payload.id = props.data.id;
    makeRequest(setLoader, updateChemicalCompound, payload, onSuccess, onError);
  };

  const onSuccess = (data, res) => {
    notify("Chemical Compound", res.msg);
  };

  const onError = (err) => {
    let errorList = [];
    errorList["password"] = err;
    setErrors(errorList);
  };

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 7 }}
      initialValues={props.data}
      onFinish={onFinish}
    >
      <Row gutter={[16, 24]} className="">
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="name"
            rules={rules.name}
            label="Name :"
            className="da-mb-16"
            {...getErrorProps(errors["name"])}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="reference"
            rules={rules.reference}
            label="Reference :"
            className="da-mb-16"
            {...getErrorProps(errors["reference"])}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="customer_id"
            label="Select Customer :"
            rules={rules.customer_id}
            className="da-mb-8"
            {...getErrorProps(errors["customer_id"])}
          >
            <Select
              showSearch
              placeholder="Select a Customer"
              options={props.dependencies.customers}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 24]} className="da-m-64">
        <Col className="gutter-row" span={12}>
          <Form.Item name="is_active" label="Status :" className="da-mb-16">
            <Switch defaultChecked={props.data.is_active} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="is_test" label="Test Mode :" className="da-mb-16">
            <Switch defaultChecked={props.data.is_test} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />
      <Form.Item wrapperCol={{ offset: 5 }}>
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

export default BasicInformation;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
};
