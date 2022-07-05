import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, Divider, Form, Input, Row, Select, Switch } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../../requests";

const Toxical = (props) => {
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
        <Col md={24}>
            <h3 className="Toxical">Toxical</h3>
        </Col>
        <Col span={12} md={12}>
            <Row>
               
            <Col span={18} md={18} className="toxicalDescription">
                <h5>Toxicalogical Data Available</h5>
            </Col>
            <Col span={6} md={6} className="toxicalDescription">
                <p>Yes</p>
            </Col>
            </Row>
            <Divider></Divider>
            <Row>
            <Col span={18} md={18} className="toxicalDescription">
                <h5>Tox CMR</h5>
            </Col>
            <Col span={6} md={6} className="toxicalDescription">
            <p>Yes</p>
            </Col>
            </Row>
            <Divider></Divider>
            <Row>
            <Col span={18} md={18} className="toxicalDescription">
                <h5>Tox Addictive</h5>
            </Col>
            <Col span={6} md={6} className="toxicalDescription">
            <p>Yes</p>
            </Col>
            </Row>
            <Divider></Divider>
            <Row>
            <Col span={18} md={18} className="toxicalDescription">
                <h5>Tox Emission</h5>
            </Col>
            <Col span={6} md={6} className="toxicalDescription">
            <p>Yes</p>
            </Col>
            </Row>
            <Divider></Divider>
        </Col>
        <Col span={12} md={12}>
        <Row>
            <Col span={18} md={18} className="toxicalDescription">
                <h5>Tox Cardio Pulmonary</h5>
            </Col>
            <Col span={6} md={6} className="toxicalDescription">
            <p>Yes</p>
            </Col>
            </Row>
            <Divider></Divider>
            <Row>
            <Col span={18} md={18} className="toxicalDescription">
                <h5>Tox Other</h5>
            </Col>
            <Col span={6} md={6} className="toxicalDescription">
            <p>Yes</p>
            </Col>
            </Row>
            <Divider></Divider>
            
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

export default Toxical;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
