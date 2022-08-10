import { CancelButton, SaveButton } from "@comps/components";
import { updateContact } from "@mods/commons/contacts/requests";
import { getLocationDependencies, updateLocation } from "@mods/commons/locations/requests";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { getErrorProps, makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Col, Form, Input, Row, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { formatCompleteData } from "../../../utils/helpers";
import { getCompany, updateCompany } from "../../thirdPartyManagement/companies/requests";



const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const formName = "editBusiness";
const Business = (props) => {

  // for map

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCEpFt_-vILimIlSXObiiEeUI5VdWyCXy8"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])



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
    const updateOn = formatCompleteData(res.object.updated_at);
    setData({ ...res.object, updateOn: updateOn, updatedby: res.object.updatedby?.name });
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
    debugger
    let payload = {

      companies_id: id,
      id: id,
      ...submitData
    }

    makeRequest(setLoader, updateCompany, payload, onSuccess, onError);

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
        <h4 className="headerLocation">HEAD OFFICE LOCATION</h4>
        <Form
          layout="vertical"
          name={formName}
          onFinish={onFinish}
          initialValues={data}
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={11}>
              <Form.Item name="first_address_line" label="First Address line :" className="da-mb-16"
                {...getErrorProps(errors['name'])}>
                <Input />
              </Form.Item>
              <Form.Item name="second_address_line" label="Second Address line :" className="da-mb-16"
              >
                <Input />
              </Form.Item>
              <Form.Item name="town_city" label="Town/City :" className="da-mb-16"
              >
                <Input />
              </Form.Item>
              <h5 className="headerHeadings">Contact Details</h5>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={24}>
                  <Form.Item name="website" label="Website" className="da-mb-16"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="landline" label="Landline  :" className="da-mb-16"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone :" className="da-mb-16"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <h5 className="headerHeadings">Email</h5>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={24}>
                  <Form.Item name="email" className="da-mb-16"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

            </Col>
            <Col className="gutter-row" span={2}></Col>

            <Col className="gutter-row" span={11}>
              <Form.Item name="county" rules={rules.name} label="County" className="da-mb-16"
              >
                <Input />
              </Form.Item>
              <Form.Item name="postcode" rules={rules.trade_name} label="Postcode  :" className="da-mb-16"
              >
                <Input />
              </Form.Item>
              <h5 className="headerHeadings">Country</h5>
              <Form.Item
                name="country_id"
                rules={rules.country}
                label="select :"
                className="da-mb-16"
                {...getErrorProps(errors["country"])}
              >
                <Select
                  showSearch
                  placeholder="Select a country"
                  options={deps.countries}
                />
              </Form.Item>


              {isLoaded && <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <></>
              </GoogleMap>}


            </Col>

          </Row>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={12}>
              <Form.Item name="updateOn" rules={rules.name} label="Last Update On" className="da-mb-16"
                {...getErrorProps(errors['name'])}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item name="updatedby" rules={rules.name} label="Last Updated By" className="da-mb-16"
                {...getErrorProps(errors['name'])}>
                <Input disabled />
              </Form.Item>
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
        </Col>
      </div>
    </>
  );

}


export default Business;
const rules = {
  name: [
    // { required: true, message: 'Please input name!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 200', },
  ]
};
