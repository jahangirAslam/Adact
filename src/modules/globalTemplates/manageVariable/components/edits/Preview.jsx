import React, { useState } from "react";
import { Form, Input, Row, Col, Divider, Switch, Select } from "antd";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { updateChemicalCompound } from "../../requests";
import { ButtonComponent } from "@comps/components";
import TextArea from "antd/lib/input/TextArea";


const Preview = (props) => {
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
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
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
        <Col className="gutter-row" xs={24} md={12} lg={12}  >
          <h3 className="TemplateHeader">Preview </h3>
          <Form.Item
            name="description"
            rules={rules.name}
            label="Description :"
            {...getErrorProps(errors["name"])}
          >
            <TextArea className="templateDiscription" rows={4} placeholder="Description" maxLength={200} />
          </Form.Item>
          

        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={11} offset={1}>
        <h3 className="TemplateHeader">Preview For </h3>
          <Form.Item name="report_level" label="Customer :">
          <Select />
          </Form.Item>
          <Form.Item name="product_type" label="Product :">
            <Select />
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

export default Preview;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
};
