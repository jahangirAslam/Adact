import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Row, Col, Divider } from "antd";
import { CancelButton, SaveButton,  ButtonComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { createCompany } from "../requests";


const formName = "createCompany";
const CreateCompany = (props) => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);



  const onFinish = (data) => {
    let payload = { "object": data }
    makeRequest(setLoader, createCompany, payload, onSuccess, onError);
  }

  const onSuccess = (data, res) => {
    notify("Company Created", res.msg);
    history.push(`/common/companies`);
  }

  const onCancel = () => {
    history.push(`/common/companies`);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['name'] = err.name;
    setErrors(errorList);
  }


  return (
    <>
    <div className="da-p-32">
      <Form
        layout="vertical"
        name={ formName }
        onFinish={ onFinish }
      >
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={12}>
          <Divider orientation="left"><strong>SUMMARY</strong></Divider>
            <Form.Item name="name" rules={ rules.name } label="Name :" className="da-mb-16"
                { ...getErrorProps(errors['name']) }>
                <Input />
            </Form.Item>
            <Form.Item name="trade_name" rules={ rules.trade_name } label="Trading Name :" className="da-mb-16"
                { ...getErrorProps(errors['trade_name']) }>
                <Input />
            </Form.Item>
            <Divider orientation="left"><strong>IDENTYFICATION</strong></Divider>
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={12}>
                  <Form.Item name="short_name" rules={ rules.short_name } label="Short Name Code :" className="da-mb-16"
                  { ...getErrorProps(errors['short_name']) }>
                  <Input />
                  </Form.Item>
                  <Form.Item name="dun_number" rules={ rules.dun_number } label="D-U-N-S Number :" className="da-mb-16"
                  { ...getErrorProps(errors['dun_number']) }>
                  <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                  <Form.Item name="vat" rules={ rules.vat } label="VAT number. (ex. GB 012345678) :" className="da-mb-16"
                  { ...getErrorProps(errors['vat']) }>
                  <Input />
                  </Form.Item>
                  <Form.Item name="fda_number" rules={ rules.fda_number } label="FDA Establishment Identification number :" className="da-mb-16"
                  { ...getErrorProps(errors['fda_number']) }>
                  <Input />
                  </Form.Item>
                </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={{width:"50%"}}>
              <img src="https://i.imgur.com/gAAklfe.png" alt="Profile" width="100%"/>
              <ButtonComponent style={{width:"100%"}} className="da-mt-12" type="primary" htmlType="submit" state={loader}>
                  Change Image
                </ButtonComponent>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={12}>
            <Divider orientation="left"><strong>TPD settings</strong></Divider>
              <Form.Item name="tpd_id" rules={ rules.tpd_id } label="TPD Submitter ID (xxxxx) :" className="da-mb-16"
                      { ...getErrorProps(errors['tpd_id']) }>
                      <Input />
              </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Divider orientation="left"><strong>Agent</strong></Divider>
              <Form.Item name="agent_id" rules={ rules.agent_id } label="Agent / Representative :" className="da-mb-16"
                      { ...getErrorProps(errors['agent_id']) }>
                      <Input />
              </Form.Item>
          </Col>
        </Row>
      </Form>
      <Col span={24} className="da-mt-32 da-text-align-right">
      <SaveButton className="da-mr-12" form={ formName } key="create_button" htmlType="submit" state={ loader } />
      <CancelButton key="close_button" onClick={ onCancel } />
      </Col>
    </div>
    </>
  );
}

export default CreateCompany

const rules = {
  name: [
    { required: true, message: 'Please input name!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 100', },
  ]
};
