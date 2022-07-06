import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Button, Col, DatePicker, Form, Input, Row, Switch } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../request";
import adact from '../../../../../assets/images/adact.png'
import TextArea from "antd/lib/input/TextArea";

const BrandWithDrawl = (props) => {
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

  const [disabled, setDisabled] = useState(false);

  const toggle = () => {
    setDisabled(!disabled);
  };

//   Date picker

const onChanges = (date, dateString) => {
    console.log(date, dateString);
  };
  
  

  return (
    <>
      <div className="da-p-32">
        <h4 className="headerLocation">Brands WithDrawal Status </h4>
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
                label="WithDrawn   :"
                {...getErrorProps(errors["name"])}
              >
               <Switch defaultChecked onChange={onChange} onClick={toggle} />;

              </Form.Item>
              <Form.Item name="trading_name" label="Sub-Brand Name :">
                {/* <Input disabled={disabled} defaultChecked /> */}
                <DatePicker onChange={onChanges} disabled={disabled} defaultChecked />
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

export default BrandWithDrawl;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
