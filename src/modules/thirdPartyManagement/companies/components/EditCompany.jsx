import { SaveButton } from "@comps/components";
import { updateContact } from "@mods/commons/contacts/requests";
import { getLocationDependencies, updateLocation } from "@mods/commons/locations/requests";
import { getErrorProps, makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Col, Form, Input, Row, Skeleton } from "antd";
import {  React, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { formatCompleteData } from "../../../../utils/helpers";
import { getCompany, updateCompany } from "../requests";
const formName = "editCompany";
const EditCompany = (props) => {
  
  
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);
  const [deps, setDeps] = useState({
    countries: [],
  });

  const getComanyData = () => {
    
    // let payload = {   };
    makeRequest(
      setLoader,
      getCompany,
       id,
      onCompanySuccess,
      onCompanyError
    );
  }




  useEffect(() => {
    getComanyData()
    // eslint-disable-next-line
  }, []);

  const onCompanySuccess = (res) => { 
    
   const updateOn = formatCompleteData(res.object.updated_at) ;
    setData({...res.object , updateOn:updateOn   , updatedby:res.object.updatedby?.name});

  }

  const onCompanyError = (res) => {
    
    // notify(res.msg);
  };

  const getSelectFieldsData = () => {
    makeRequestStateless(
      getLocationDependencies,
      null,
      onDependencySuccess,
      null
    );
  };

  useEffect(() => {
    getSelectFieldsData();
    // eslint-disable-next-line
  }, []);

  const onDependencySuccess = (data, res) => {
    setDeps({
      countries: data.countries,
    });
  };

  const onCancel = () => {
    history.push(`/common/companies`);
  };

  const onFinish = (submitData) => {

    let payload = {
      agent_id: submitData.agent_id,
      dun_number: submitData.dun_number,
      fda_number: submitData.fda_number,
      name: submitData.name,
      short_name: submitData.short_name,
      id: props.id,
      tpd_setting: submitData.tpd_setting,
      trade_name: submitData.trade_name,
      type: submitData.type,
      vat: submitData.vat,
    };
    let location = {
      first_address: submitData.first_address,
      second_address: submitData.second_address,
      country_id: submitData.country_id,
      state: submitData.state,
      zipcode: submitData.zipcode,
      id: data.object.location_id,
    };
    let contact = {
      email: submitData.email,
      landline: submitData.landline,
      mobile: submitData.mobile,
      website: submitData.website,
      id: data.object.contact_id,
    };
    makeRequest(setLoader, updateCompany, payload, onSuccess, onError);
    makeRequest(setLoader, updateLocation, location, Function, onError);
    makeRequest(setLoader, updateContact, contact, Function, onError);
  };

  const onSuccess = (data, res) => {
    notify("Updated", res.msg);
    props.onUpdated(data.object);
  };

  const onError = (err) => {
    let errorList = [];
    errorList["name"] = err.first_name;
    setErrors(errorList);
  };

  if (data.length === 0) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="da-p-32">
        <Row>
          <Col span={24} xs={24}>

            <Form
              layout="vertical"
              name={formName}
              onFinish={onFinish}
              initialValues={data }
            >
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={24} xs={24}>
                  <h5 className="headerHeadings">Summary</h5>
                  <Form.Item
                    name="name"
                    rules={rules.name}
                    label="Name :"
                    className="da-mb-16"
                    {...getErrorProps(errors["name"])}
                  >
                    <Input />
                  </Form.Item>
                  {props.type === "laboratory" ? (
                    ""
                  ) : (
                    <Form.Item
                      name="trade_name"
                      rules={rules.trade_name}
                      label="Trading Name :"
                      className="da-mb-16"
                      {...getErrorProps(errors["trade_name"])}
                    >
                      <Input />
                    </Form.Item>
                  )}

                  {props.type === "manufacture" ||
                  props.type === "laboratory" ? (
                    ""
                  ) : (
                    <div>
                      <Row>
                        <h5 className="headerHeadings">Identification</h5>

                        <Col className="gutter-row" span={12} md={24} xs={24}>
                          <Form.Item
                            name="short_name"
                            rules={rules.short_name}
                            label="Short Name Code :"
                            className="da-mb-16"
                            {...getErrorProps(errors["short_name"])}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12} md={24} xs={24}>
                          <Form.Item
                            name="vat"
                            rules={rules.vat}
                            label="VAT number. (ex. GB 012345678) :"
                            className="da-mb-16"
                            {...getErrorProps(errors["vat"])}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12} md={24} xs={24}>
                          <h5 className="headerHeadings">TPD Setting</h5>
                          <Form.Item
                            name="tpd_setting"
                            rules={rules.tpd_id}
                            label="TPD Submitter ID (xxxxx) :"
                            className="da-mb-16"
                            {...getErrorProps(errors["tpd_setting"])}
                          >
                            <Input maxLength={5} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  )}
                  <Col className="gutter-row" span={12} xs={24}>
                    <Form.Item
                      name="updateOn"
                      rules={rules.agent_id}
                      label="Last Update on :"
                      className="da-mb-16"
                      {...getErrorProps(errors["agent_id"])}
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={12} xs={24}>
                    <Form.Item
                      name="updatedby"
                      rules={rules.agent_id}
                      label="Last Updated by"
                      className="da-mb-16"
                      {...getErrorProps(errors["agent_id"])}
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Col>
              </Row>
            </Form>
            <Col span={24} xs={24} className="da-mt-32 da-text-align-right">
              <SaveButton
                className="da-mr-12"
                form={formName}
                key="create_button"
                htmlType="submit"
                state={loader}
              />
              {/* <CancelButton key="close_button" onClick={onCancel} /> */}
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EditCompany;

const rules = {
  name: [
    { required: true, message: "Please input name!" },
    { min: 3, message: "Minimum name length is 3" },
    { max: 100, message: "Maximum name length is 100" },
  ],
};
