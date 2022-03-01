import React, { useState } from "react";
import { Form, Input, Skeleton, Row, Col, Divider, Select } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { CancelButton, SaveButton } from "@comps/components";
import { makeRequest, getErrorProps, notify, makeRequestStateless } from "@utils/helpers";
import { getCompany, updateCompany } from "../requests";
import { useEffect } from "react";
import { getLocationDependencies, updateLocation } from "@mods/commons/locations/requests";
import {  updateContact } from "@mods/commons/contacts/requests";


const formName = "editCompany";
const EditCompany = (props) => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);
  const [deps, setDeps] = useState({
    countries: []
  });
  useEffect(() => {
    makeRequest(setLoader, getCompany, props.id ? props.id : id, onCompanySuccess, onCompanyError);
    // eslint-disable-next-line
  }, []);

  const onCompanySuccess = (res) => {
    setData(res);
  }

  const onCompanyError = (res) => {
    notify(res.msg)
  }

  const getSelectFieldsData = () => {
    makeRequestStateless(getLocationDependencies, null, onDependencySuccess, null);
}

useEffect(() => {
    getSelectFieldsData();
    // eslint-disable-next-line
}, []);

const onDependencySuccess = (data, res) => {
  setDeps({
      countries: data.countries,
  });
}

  const onCancel = () => {
    history.push(`/common/companies`);
  }

  const onFinish = (submitData) => {
    let payload = {
      "agent_id": submitData.agent_id, "dun_number": submitData.dun_number, "fda_number": submitData.fda_number, "name": submitData.name
      , "short_name": submitData.short_name, "id": props.id, "tpd_setting": submitData.tpd_setting,"trade_name": submitData.trade_name,"type": submitData.type
      ,"vat" : submitData.vat }
    let location = {"first_address":submitData.first_address, "second_address": submitData.second_address, "country_id": submitData.country_id, 
    "state": submitData.state, "zipcode": submitData.zipcode, id: data.object.location_id}
    let contact = {"email": submitData.email, "landline": submitData.landline, "mobile": submitData.mobile, 
    "website": submitData.website, id: data.object.contact_id}
    makeRequest(setLoader, updateCompany, payload, onSuccess, onError);
    makeRequest(setLoader, updateLocation, location, Function, onError);
    makeRequest(setLoader, updateContact, contact, Function, onError);
  }

  const onSuccess = (data, res) => {
    notify("Updated", res.msg);
    props.onUpdated(data.object);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['name'] = err.first_name;
    setErrors(errorList);
  }


  if (data.length === 0) {
    return <Skeleton />
  }

  return (
    <> 
    <div className="da-p-32">
      <Form
        layout="vertical"
        name={ formName }
        onFinish={ onFinish }
        initialValues={ data.object }
      >
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={11}>
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
                  <Col className="gutter-row" span={12}>
                    <Form.Item name="tpd_setting" rules={ rules.tpd_id } label="TPD Submitter ID (xxxxx) :" className="da-mb-16"
                            { ...getErrorProps(errors['tpd_setting']) }>
                            <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item name="agent_id" rules={ rules.agent_id } label="Agent / Representative :" className="da-mb-16"
                            { ...getErrorProps(errors['agent_id']) }>
                            <Input />
                    </Form.Item>
                </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={2}></Col>
          <Col className="gutter-row" span={11}>
          <Divider orientation="left"><strong>LOCATION</strong></Divider>
          <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={12}>
                <Form.Item name="first_address" rules={ rules.first_address } label="Address :" className="da-mb-16"
                    { ...getErrorProps(errors['first_address']) }>
                    <Input />
                </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
                <Form.Item name="second_address" rules={ rules.second_address } label="Address :" className="da-mb-16"
                    { ...getErrorProps(errors['second_address']) }>
                    <Input />
                </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
                <Form.Item name="state" rules={ rules.state } label="State :" className="da-mb-16"
                    { ...getErrorProps(errors['state']) }>
                    <Input />
                </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
                <Form.Item name="zipcode" rules={ rules.zipcode } label="Zip code :" className="da-mb-16"
                    { ...getErrorProps(errors['zipcode']) }>
                    <Input />
                </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
          <Form.Item name="country_id" rules={ rules.country } label="Country :" className="da-mb-16"
                    { ...getErrorProps(errors['country']) }>
                    <Select
                        showSearch
                        placeholder="Select a country"
                        options={ deps.countries }
                    />
                </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
               <Form.Item name="city" rules={ rules.city } label="City :" className="da-mb-16"
                    { ...getErrorProps(errors['city']) }>
                    <Input />
                </Form.Item>
          </Col>
          </Row>

          <Divider orientation="left"><strong>CONTAC DETAIL</strong></Divider>
          <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={12}>
                <Form.Item name="website" rules={ rules.website } label="Website :" className="da-mb-16"
                    { ...getErrorProps(errors['website']) }>
                    <Input />
                </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
              <Form.Item name="mobile" rules={ rules.mobile } label="Mobile :" className="da-mb-16"
              { ...getErrorProps(errors['mobile']) }>
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
                    <Form.Item name="landline" rules={ rules.landline } label="Landline :" className="da-mb-16"
                    { ...getErrorProps(errors['landline']) }>
                    <Input />
                  </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
                  <Form.Item name="email" rules={ rules.email } label="Email :" className="da-mb-16"
                    { ...getErrorProps(errors['email']) }>
                    <Input />
                  </Form.Item>
          </Col>
          </Row>
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

export default EditCompany

const rules = {
  name: [
    { required: true, message: 'Please input name!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 100', },
  ]
};
