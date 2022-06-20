import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../request";

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
        <h4 className="headerLocation">Summary </h4>
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
                label="Name :"
                {...getErrorProps(errors["name"])}
              >
                <Input />
              </Form.Item>
              <Form.Item name="trading_name" label="Test_ref :">
                <Input />
              </Form.Item>

              <h5>Identification</h5>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="short_name_code" label="ADC :">
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="vat_number" label="VAT Number :">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="d_u_n_s_number" label="D-U-N-S Number :">
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={12}>
                  <Form.Item name="fda_number" label="FDA Esteblishment Id  :">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} md={11}>
              <div>
                <h5>TPD Setting</h5>
              </div>
              <Form.Item name="tpd_submitter" label="TPD Submitter Id  :">
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={11}>
              <h5> Agent/Representattive</h5>

              <Form.Item name="agent" label="Agent/Representattive  :">
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={11}>
              <h5> Last update on</h5>
              <Form.Item name="fda_number" label="last Update on  :">
                <Input />
              </Form.Item>
            </Col>
            {/* <h5>Last Update</h5> */}
            <Col className="gutter-row" xs={24} md={11}>
              <h5> Last update by</h5>
              <Form.Item name="updated_by" label="last Update by  :">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Col className="gutter-row" xs={24} md={12} lg={12}></Col>

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
