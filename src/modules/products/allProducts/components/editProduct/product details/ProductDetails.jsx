import { WarningOutlined } from "@ant-design/icons";
import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, DatePicker, Form, Input, Row, Select, Switch } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../../request";

const ProductDetails = (props) => {
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };
  var selected = {};

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

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
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <Form
      layout="vertical"
      // labelCol={{ span: 7 }}
      initialValues={props.data}
      onFinish={onFinish}
    >
      <Row gutter={[16, 24]}>
        <Col xs={24} md={24}>
          <h5>Product Details</h5>
        </Col>

        <Col className="gutter-row" xs={24} md={12} lg={12}>
          <Form.Item
            name="Launch Year"
            rules={rules.name}
            label="Product Available for purchase from Date :"
            {...getErrorProps(errors["name"])}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={12}>
          <Form.Item name="customers" label="Customer :">
            <Select
              showSearch
              placeholder="Customer   "
              options={props.dependencies.customers}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 24]}>
        <Col xs={24} md={24}>
          <h5>Product Withdrawn Status</h5>
        </Col>

        <Col className="gutter-row" xs={24} lg={12}>
          <Form.Item
            name="is_active"
            label="This product is withdrawal from selling :"
            className="da-mb-16"
          >
            <Switch defaultChecked onChange={onChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} lg={12}>
          <Form.Item name="product_width" label="Withdrawal Date">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} className="productDetails">
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            This Product is invalid or contains invalid or missing elements
          </p>
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            This Product hase invalid recepi
          </p>
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            Product Recipe is incomplete Missing 10%
          </p>
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            Product Weight is invalid (0mg to 10mg)
          </p>
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            This required Minimum one emission test
          </p>
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

export default ProductDetails;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
