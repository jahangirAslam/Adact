import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, Form, Input, Row } from "antd";
import { useState } from "react";
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
        <Form
          layout="vertical"
          // labelCol={{ span: 7 }}
          initialValues={props.data}
          onFinish={onFinish}
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" xs={24} md={12} lg={12}>
              <Form.Item name="type" label="Type :" className="da-mb-16"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12} lg={12}>
              <Form.Item name="submission_status" label="Submission status :" className="da-mb-16"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12} lg={12}>
              <Form.Item name="message" label="Message :" className="da-mb-16"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12} lg={12}>
              <Form.Item name="submission_size" label="Submission Size :" className="da-mb-16"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12} lg={12}>
              <Form.Item name="submission_type" label="Submission Type :" className="da-mb-16"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12} lg={12}>
              <Form.Item name="submission_target" label="Submission target :" className="da-mb-16"
              >
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
