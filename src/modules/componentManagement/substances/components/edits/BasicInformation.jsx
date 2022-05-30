import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, Divider, Form, Input, Row, Select, Switch } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../../requests";

const BasicInformation = (props) => {
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
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="name"
            rules={rules.name}
            label="Name :"
            {...getErrorProps(errors["name"])}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item name="iupac_name" label="IUPAC Name :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item name="ref_number" label="Reference Number :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item name="reach_number" label="Reach Number :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item name="fema_number" label="FEMA Number :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item name="reach_registration" label="Reach Registration :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item name="cas_number" label="CAS Number :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item name="vaporised" label="Non Vaporised Status :">
            <Select
              showSearch
              placeholder="Select a country"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={8}>
          <Form.Item name="is_safe" label="Ingredient unsafe to use? :">
            <Switch defaultChecked={props.data.is_safe} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="status" label="Status :">
            <Switch defaultChecked={props.data.status} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="is_test" label="Test Mode :">
            <Switch defaultChecked={props.data.is_test} />
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

export default BasicInformation;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
