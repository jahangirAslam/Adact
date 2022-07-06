import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../request";
import adact from "../../../../../assets/images/adact.png";

const ContactDetails = (props) => {
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
    <>
      <div className="da-p-32">
        <h4 className="headerLocation">Contact Details </h4>
        <Form
          layout="vertical"
          // labelCol={{ span: 7 }}
          initialValues={props.data}
          onFinish={onFinish}
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} md={12}>
              <Form.Item name="short_name_code" label="Contact name  :">
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={12}>
              <Form.Item name="short_name_code" label="Wbsite :">
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12}>
              <Form.Item name="short_name_code" label="Mobile Number  :">
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={12}>
              <Form.Item name="short_name_code" label="Email Adress :">
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12}>
              <Form.Item name="short_name_code" label="LandLine Number :">
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
              Apply
            </ButtonComponent>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ContactDetails;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
