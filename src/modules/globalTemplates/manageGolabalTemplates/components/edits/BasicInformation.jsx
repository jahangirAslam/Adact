import React, { useState } from "react";
import { Form, Input, Row, Col, Divider, Switch, Select } from "antd";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { updateChemicalCompound } from "../../requests";
import { ButtonComponent } from "@comps/components";
import TextArea from "antd/lib/input/TextArea";


const BasicInformation = (props) => {
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
          <h3 className="TemplateHeader">Subject </h3>
          <Form.Item
            name="title"
            rules={rules.name}
            label="Test :"
            {...getErrorProps(errors["name"])}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            rules={rules.name}
            label="Description :"
            {...getErrorProps(errors["name"])}
          >
            <TextArea className="templateDiscription" rows={4} placeholder="Description" maxLength={200} />
          </Form.Item>
          <h5 className="TemplateHeader">Master File</h5>
          <Form.Item name="fed_uuin" label="Assign to table of Content :">
          <Select />
          </Form.Item>
          <h5 className="TemplateHeader">Content</h5>
          {/* text Editor */}
          <h3 className="TemplateHeader">Status </h3>
          <Form.Item name="fed_uuin" label=" Update On:">
            <Input disabled />
          </Form.Item>
          <Form.Item name="fed_uuin" label=" Updated:">
            <Input disabled />
          </Form.Item>
          <Form.Item name="fed_uuin" label="Validation Status :">
          <Select />
          </Form.Item>
          <Form.Item name="fed_uuin" label="Validate on :">
            <Input disabled />
          </Form.Item>
          <Form.Item name="fed_uuin" label="Validated By :">
            <Input disabled />
          </Form.Item>



        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={11} offset={1}>
        <h3 className="TemplateHeader">Report Level </h3>
          <Form.Item name="fed_uuin" label="Overview :">
            <Input />
          </Form.Item>
          <h5 className="TemplateHeader">Apply This Templates To Specified Product Type</h5>
          <Form.Item name="fed_uuin" label="Not Set :">
            <Select />
          </Form.Item>
          <h5 className="TemplateHeader">Document Visibility</h5>
          <Form.Item name="fed_uuin" label="Not Confidental :">
          <Switch defaultChecked onChange={onChange} />;

          </Form.Item>
          <Form.Item name="fed_uuin" label="Public :">
          <Switch defaultChecked onChange={onChange} />
          </Form.Item>
          <h5 className="TemplateHeader">Template For</h5>
          <Form.Item name="fed_uuin" label="Specified Customers :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <h5 className="TemplateHeader">Document Type</h5>
          <Form.Item name="fed_uuin" label="TPD Document :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="fed_uuin" label="PMTA Document :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="fed_uuin" label="MHRA Document :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="fed_uuin" label="CBD Document :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <h5 className="TemplateHeader">Default For</h5>
          <Form.Item name="fed_uuin" label="TPD  :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="fed_uuin" label="PMTA  :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="fed_uuin" label="MHRA  :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="fed_uuin" label="CBD  :">
          <Switch defaultChecked onChange={onChange} />

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

export default BasicInformation;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
};
