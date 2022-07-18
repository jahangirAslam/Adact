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
            label="Name :"
            {...getErrorProps(errors["name"])}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="fed_uuin" label="fed_uuin :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="manufacturer_ref" label="Manufacturer Name :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="manufacturer_ref" label="manufacturer_ref :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="has_recipe" label="Has Recipe :">
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="is_valid_manufacturer" label="The manufacturer records are valid?">
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="is_valid_manufacturer" label="Recipe is valid">
            <Input disabled={true} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={8}>
          <Form.Item name="is_active" label="Flavour status">
            <Switch defaultChecked={props.data.is_safe} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item name="is_test" label="Test Mode :">
            <Switch defaultChecked={props.data.is_test} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />

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

export default BasicInformation;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
};
