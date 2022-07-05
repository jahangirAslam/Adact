import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, Divider, Form, Input, Row, Select, Switch } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../../requests";

const DataSource = (props) => {
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

  // const onChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  // };

  return (
    <div>
      <h4 className="datasource">Auto Synic Data with Data Source</h4>
      <Form
        layout="vertical"
        // labelCol={{ span: 7 }}
        initialValues={props.data}
        onFinish={onFinish}
      >
        <Row gutter={[16, 24]}>
          <Col md={24}>
            <Form.Item label="Select If you want to syn data With Data source">
              <Switch defaultChecked onChange={onChange} />;
            </Form.Item>
          </Col>
          <Col span={24} md={24}>
            <Row>
              <Col span={6} md={6} className="toxicalDescription">
                <Form.Item>
                    {/* We convert them into anchor tag */}
                  <h5>ECHA</h5>
                </Form.Item>
              </Col>
              <Col span={6} md={6} className="toxicalDescription">
                <Form.Item>
                  <h5>20-02-2020</h5>
                </Form.Item>
              </Col>
              <Col span={6} md={6} className="toxicalDescription">
                <Form.Item>
                  <h5>PubChem</h5>
                </Form.Item>
              </Col>
              <Col span={6} md={6} className="toxicalDescription">
                <Form.Item>
                  <h5>20-02-2020</h5>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24} md={24}>
            <Row>
              <Col span={6} md={6} className="toxicalDescription">
                <Form.Item>
                  <h5>Cameo Chemical</h5>
                </Form.Item>
              </Col>
              <Col span={6} md={6} className="toxicalDescription">
                <Form.Item>
                  <h5>N/A</h5>
                </Form.Item>
              </Col>
              <Col span={6} md={6} className="toxicalDescription">
                <Form.Item>
                  <h5>PubChem</h5>
                </Form.Item>
              </Col>
              <Col span={6} md={6} className="toxicalDescription">
                <Form.Item>
                  <h5>N/A</h5>
                </Form.Item>
              </Col>
            </Row>
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
  );
};

export default DataSource;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
