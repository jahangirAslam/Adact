import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, Divider, Form, Input, Row, Switch, Typography } from "antd";
import React, { useState } from "react";
// import { updateSubstance } from "../request";

const MyProfile = (props) => {
    const { Title } = Typography;
  const [loader, setLoader] = useState("");
  const [errors, setErrors] = useState([]);

  const onFinish = (payload) => {
    payload.id = props.data.id;
    // makeRequest(setLoader, updateSubstance, payload, onSuccess, onError);
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
      <Col className=" gutter-row" span={24}>
          <Title level={4}>Chemical and Physical Properties</Title>
        </Col>
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
    
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="email"
            rules={rules.email}
            label="Email :"
            {...getErrorProps(errors["email"])}
          >
            <Input />
          </Form.Item>
        </Col>
    
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="last-name"
            rules={rules.name}
            label="Last Name :"
            {...getErrorProps(errors["name"])}
          >
            <Input />
          </Form.Item>
        </Col>
    
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="phone"
            rules={rules.name}
            label="Phone :"
            {...getErrorProps(errors["phone"])}
          >
            <Input />
          </Form.Item>
        </Col>
    
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="lanline"
            rules={rules.name}
            label="Lanline :"
            {...getErrorProps(errors["lanline"])}
          >
            <Input />
          </Form.Item>
        </Col>
    
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="title"
            rules={rules.name}
            label="Title :"
            {...getErrorProps(errors["title"])}
          >
            <Input />
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

export default MyProfile;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
