import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, Divider, Form, Input, Row, Switch, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
// import { updateSubstance } from "../request";

const Setting = (props) => {
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

  

  return (
    <Form
      layout="vertical"
      // labelCol={{ span: 7 }}
      initialValues={props.data}
      onFinish={onFinish}
    >
      <Row gutter={[16, 24]}>
      <Col className=" gutter-row" span={24}>
          <Title level={4}>Settings</Title>
        </Col>
        <Col className="gutter-row" xs={24}   >
          <Form.Item
            name="name"
            rules={rules.name}
            label="Name :"
            {...getErrorProps(errors["name"])}
          >
                <TextArea className="settingTextArea" rows={4} placeholder="maxLength is 6" maxLength={600} />
          </Form.Item>
        </Col>
    
        <Col className="gutter-row" xs={24}   >
          <Form.Item
            name="print"
            rules={rules.email}
            label="Print :"
            {...getErrorProps(errors["email"])}
          >
            <Input  placeholder="Type text into and click on submit button"/>
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
  );
};

export default Setting;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
