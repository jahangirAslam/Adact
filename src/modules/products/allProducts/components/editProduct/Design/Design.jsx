import { BodyComponent, ButtonComponent } from "@comps/components";
import { makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Col, Form, Input, Row, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getFlavours,
  getProductDependencies,
  updateSubstance,
} from "../Mandatory/request";
const onChange = (value) => {
  console.log("changed", value);
};
const Design = (props) => {
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };
  var delItems = [];
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [filters, setFilters] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [errors, setErrors] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    sortName: "id",
    sortType: "desc",
  });
  const [deps, setDeps] = useState({
    volt: [],
  });
  const [childComponent, setChildComponent] = useState(null);

  const getSelectFieldsData = () => {
    makeRequestStateless(
      getProductDependencies,
      null,
      onDependencySuccess,
      null
    );
  };
  const onDependencySuccess = (data, res) => {
    setDeps({
      volt: data.Volt_Walt_Adjustable,
    });
  };
  useEffect(() => {
    getSelectFieldsData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getAllFlavours();
    // eslint-disable-next-line
  }, [pagination, filters]);

  const getAllFlavours = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      filters,
    };
    makeRequest(setLoader, getFlavours, payload, onSuccess, null);
  };

  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal);
    setDataSource(response.data);
  };
  const onError = (err) => {
    let errorList = [];
    errorList["password"] = err;
    setErrors(errorList);
  };
  const onCreated = () => {
    notify("Design created successfuly ");
  };

  //deleted multi Items
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      delItems = [];
      delItems = selectedRowKeys;
    },
  };
  
  const onFinish = (payload) => {
    payload.id = props.data.id;
    makeRequest(setLoader, updateSubstance, payload, onSuccess, onError);
  };
  return (
    <>
      {childComponent}
      <Row justify="space-between" className="da-pb-24">
        <Col className="inner-form-heading">
          <h4>Product Design</h4>
        </Col>
        {/* <CreateButton onClick={onCreate} /> */}
      </Row>
      <BodyComponent>
        <Form
          layout="vertical"
          // labelCol={{ span: 7 }}
          initialValues={props.data}
          onFinish={onFinish}
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={8}>
              <h5 className="discription-details">Product Description</h5>
              <Form.Item name="description" label="Description :">
                <TextArea
                  rows={100}
                  placeholder="maxLength is 6"
                  maxLength={1000}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12} lg={16}>
              <h5>Product Dimensions</h5>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                  <Form.Item name="product_length" label="Length mm :">
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={8}>
                  <Form.Item name="product_width" label="Width   mm :">
                    <Input />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" xs={24} md={12} lg={8}>
                  <Form.Item name="product_height" label="Height   mm">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <h5>E-Liquid</h5>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" xs={24} md={12} lg={10}>
                  <Form.Item
                    name="liquid_volume_capacity"
                    label="Liquid Volume Capacity"
                  >
                    <Input disabled={disabled} />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={12} lg={10}>
                  <Form.Item
                    name="nicotine_concentration"
                    label="Nicotine Concentration"
                  >
                    <Input disabled={disabled} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* nEW rOW  */}
          <Row gutter={[16, 24]}>
            <Col
              className="gutter-row electric-substance "
              xs={24}
              md={12}
              lg={24}
            >
              <div className="electric-substance">
                <h5>Electric Products</h5>
              </div>
            </Col>
            <Row gutter={[16, 24]}>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item name="battery_type" label="Battery Type ">
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item
                  name="battery_type_capacity"
                  label="Battery Type Capacity"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item
                  name="volt_watt_adjustable"
                  label="Volt Watt Adjustable"
                >
                  <Select
                    showSearch
                    placeholder="Adjustable"
                    options={deps.volt}
                  />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item name="e_cig_device_id" label="E-Cig Device ID">
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={4}
              >
                <Form.Item name="wick_changeable" label="wick_changeable :">
                  <Switch defaultChecked={props.data.wick_changeable} />
                </Form.Item>
              </Col>
            </Row>

            {/* new Row */}
            <Row gutter={[16, 24]}>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item name="voltage" label=" Voltage(V) ">
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item
                  name="voltage_lower_range_v"
                  label="Voltage Lower Range (v)"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item
                  name="voltage_upper_range_v"
                  label="Voltage upper Range (v)"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item name="coil_resistance" label="Coil Resistance">
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={4}
              >
                <Form.Item name="microprocessor" label="Microprocessor :">
                  <Switch defaultChecked={props.data.microprocessor} />
                </Form.Item>
              </Col>
            </Row>
            {/* new Row */}
            <Row gutter={[16, 24]}>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item name="wattage" label=" Wattage (W) ">
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item
                  name="voltage_lower_range_w"
                  label="Voltage Lower Range (W)"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item name="ecid" label="Voltage upper Range (W)">
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={5}
              >
                <Form.Item name="coil_composition" label="Coil Composition">
                  <Input />
                </Form.Item>
              </Col>
              <Col
                className="gutter-row discription-area"
                xs={24}
                md={12}
                lg={4}
              >
                <Form.Item
                  name="airflow_adjustable"
                  label="airflow_adjustable :"
                >
                  <Switch defaultChecked={props.data.airflow_adjustable} />
                </Form.Item>
              </Col>
            </Row>
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
      </BodyComponent>
    </>
  );
};

export default Design;
