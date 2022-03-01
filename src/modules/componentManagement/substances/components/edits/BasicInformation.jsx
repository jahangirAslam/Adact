import React, { useState } from "react";
import { Form, Input, Row, Col, Divider, Switch, Select } from "antd";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { updateSubstance } from "../../requests";
import { ButtonComponent } from "@comps/components";

const BasicInformation = (props) => {
  const [loader, setLoader] = useState('');
  const [errors, setErrors] = useState([]);


  const onFinish = (payload) => {
    payload.id = props.data.id;
    makeRequest(setLoader, updateSubstance, payload, onSuccess, onError);
  }


  const onSuccess = (data, res) => {
    notify("Substance", res.msg);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['password'] = err;
    setErrors(errorList);
  }

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 7 }}
      initialValues={props.data}
      onFinish={onFinish}
    >
      <Row gutter={[16, 24]} className="da-m-64">
      <Col className="gutter-row" span={12}>
      <Form.Item name="name" rules={rules.name} label="Name :" className="da-mb-16"
        {...getErrorProps(errors['name'])}
      >
        <Input />
      </Form.Item>
      </Col>
      <Col className="gutter-row" span={12}>
      <Form.Item name="iupac_name"  label="IUPAC Name :" className="da-mb-16"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col className="gutter-row" span={12}>
      <Form.Item name="ref_number"  label="Reference Number :" className="da-mb-16"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col className="gutter-row" span={12}>
      <Form.Item name="reach_number"  label="Reach Number :" className="da-mb-16"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col className="gutter-row" span={12}>
      <Form.Item name="fema_number"  label="FEMA Number :" className="da-mb-16"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col className="gutter-row" span={12}>
      <Form.Item name="reach_registration"  label="Reach Registration :" className="da-mb-16"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col className="gutter-row" span={12}>
      <Form.Item name="cas_number"  label="CAS Number :" className="da-mb-16"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col className="gutter-row" span={12}>
      <Form.Item name="vaporised"  label="Non Vaporised Status :" className="da-mb-16"
      >
        <Select
                        showSearch
                        placeholder="Select a country"
                        options={ [{"label":"Yes","value":"yes"},{"label":"No","value":"no"}] }
                    />
      </Form.Item>
      </Col>
      </Row>
      <Divider orientation="left"/>
      <Row gutter={[16, 24]} className="da-m-64">
      <Col className="gutter-row" span={8}>
      <Form.Item name="is_safe"  label="Ingredient unsafe to use? :" className="da-mb-16"
      >
        <Switch defaultChecked={props.data.is_safe} />
      </Form.Item>
      </Col>
      <Col className="gutter-row" span={8}>
      <Form.Item name="status"  label="Status :" className="da-mb-16"
      >
        <Switch defaultChecked={props.data.status} />
      </Form.Item>
      </Col>
      <Col className="gutter-row" span={8}>
      <Form.Item name="is_test"  label="Test Mode :" className="da-mb-16"
      >
        <Switch defaultChecked={props.data.is_test} />
      </Form.Item>
      </Col>
      </Row>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <ButtonComponent className="da-mr-10" type="primary" htmlType="submit" state={loader}>Save Update</ButtonComponent>
      </Form.Item>
    </Form>
  );
}

export default BasicInformation;

const rules = {
  name: [
    { required: true, message: 'Please input your password!', },
    { min: 3, message: 'Minimum password length is 3', },
    { max: 100, message: 'Maximum password length is 100', },
  ],
  role_id: [
    { required: true, message: 'Please select user role!', },
  ],
  company_id: [
    { required: true, message: 'Please select user third party!', },
  ],
};
