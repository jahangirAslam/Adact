import { CancelButton, SaveButton } from "@comps/components";
import { updateContact } from "@mods/commons/contacts/requests";
import { getLocationDependencies, updateLocation } from "@mods/commons/locations/requests";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { getErrorProps, makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Col, Form, Input, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getCompany, updateCompany } from "../../thirdPartyManagement/companies/requests";



const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const formName = "editCompany";
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
      , "short_name": submitData.short_name, "id": props.id, "tpd_setting": submitData.tpd_setting, "trade_name": submitData.trade_name, "type": submitData.type
      , "vat": submitData.vat
    }
    let location = {
      "first_address": submitData.first_address, "second_address": submitData.second_address, "country_id": submitData.country_id,
      "state": submitData.state, "zipcode": submitData.zipcode, id: data.object.location_id
    }
    let contact = {
      "email": submitData.email, "landline": submitData.landline, "mobile": submitData.mobile,
      "website": submitData.website, id: data.object.contact_id
    }
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
        <h4 className="headerLocation">HEAD OFFICE LOCATION</h4>
        <Form
          layout="vertical"
          name={formName}
          onFinish={onFinish}
          initialValues={data.object}
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={11}>
              <Form.Item name="first_address"  label="First Address line :" className="da-mb-16"
                {...getErrorProps(errors['name'])}>
                <Input />
              </Form.Item>
              <Form.Item name="second_address"  label="Second Address line :" className="da-mb-16"
              >
                <Input />
              </Form.Item>
              <Form.Item name="city"  label="Town/City :" className="da-mb-16"
                >
                <Input />
              </Form.Item>
              <h5 className="headerHeadings">Contact Details</h5>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={24}>
                  <Form.Item name="website"  label="Website" className="da-mb-16"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="landline"  label="Landline  :" className="da-mb-16"
                   >
                    <Input />
                  </Form.Item>
                  <Form.Item name="mobile"  label="Phone :" className="da-mb-16"
                    >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <h5 className="headerHeadings">Email</h5>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={24}>
                  <Form.Item name="email"  label="Email" className="da-mb-16"
                    >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

            </Col>
            <Col className="gutter-row" span={2}></Col>

            <Col className="gutter-row" span={11}>
              <Form.Item name="state" rules={rules.name} label="County" className="da-mb-16"
               >
                <Input />
              </Form.Item>
              <Form.Item name="zipcode" rules={rules.trade_name} label="Postcode  :" className="da-mb-16"
                >
                <Input />
              </Form.Item>
              <h5 className="headerHeadings">Country</h5>
              <Form.Item name="country_id" rules={rules.trade_name} label=" country" className="da-mb-16"
                >
                <Input />
              </Form.Item>
              {/* Map  */}

              {isLoaded && <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>}


            </Col>

          </Row>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={12}>
              <Form.Item name="name" rules={rules.name} label="Last Update On" className="da-mb-16"
                {...getErrorProps(errors['name'])}>
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item name="name" rules={rules.name} label="Last Updated By" className="da-mb-16"
                {...getErrorProps(errors['name'])}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Col span={24} className="da-mt-32 da-text-align-right">
          <SaveButton className="da-mr-12" form={formName} key="create_button" htmlType="submit" state={loader} />
          <CancelButton key="close_button" onClick={onCancel} />
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
