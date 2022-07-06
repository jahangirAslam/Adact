import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../request";
import adact from '../../../../../assets/images/adact.png'
import TextArea from "antd/lib/input/TextArea";

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

  // const onChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  // };

  return (
    <>
      <div className="da-p-32">
        <h4 className="headerLocation">Details </h4>
        <Form
          layout="vertical"
          // labelCol={{ span: 7 }}
          initialValues={props.data}
          onFinish={onFinish}
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} md={12} lg={12}>
              <Form.Item
                name="name"
                rules={rules.name}
                label="Brand Name  :"
                {...getErrorProps(errors["name"])}
              >
                <Input />
              </Form.Item>
              <Form.Item name="trading_name" label="Sub-Brand Name :">
                <Input />
              </Form.Item>

              <h5>Markit</h5>
              <Form.Item name="trading_name" label="Markit :">
                <Input />
              </Form.Item>
              <h5>Agent</h5>
              <Form.Item name="trading_name" label="Representative :">
                <Input />
              </Form.Item>
             

              <h5> Brand Identification</h5>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="short_name_code" label="Product ID :">
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="vat_number" label="Custom ID :">
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="vat_number" label="UPC-A :">
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="vat_number" label="EAN :">
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="vat_number" label="GTIN :">
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="vat_number" label="SKU :">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              
            </Col>

            <Col className="gutter-row" xs={24} md={12} lg={12}>
            <h5>Status</h5>
              <Form.Item name="trading_name" label="Representative :">
                <Input />
              </Form.Item>
              <h5>published Date</h5>
              <Form.Item name="trading_name" label="Published Date :">
                <Input />
              </Form.Item>
            <div className="logoAdact">
            <img src={adact} alt="Logo"  />
            </div>
            <div>
            <input type="file" id="actual-btn" hidden/>
            <label for="actual-btn" className="label">Change</label>
            </div>
            <Col className="gutter-row discription-details" span={11} md={11} >
                <h5 className="headerHeadings-details">Product Description</h5>
            <TextArea rows={100} placeholder="Discription" maxLength={1000} />
            </Col>

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
      </div>
    </>
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
