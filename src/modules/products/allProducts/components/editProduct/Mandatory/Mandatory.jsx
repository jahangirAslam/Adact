import { ButtonComponent } from "@comps/components";
import { makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Col, Form, Row, Switch } from "antd";
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

const Mandatory = (props) => {
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
    notify("Mandatory created successfuly ");
  };

  //deleted multi Items
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      delItems = [];
      delItems = selectedRowKeys;
    },
  };

  const onFinish = (payload) => {
    debugger;
    payload.id = props.data.id;
    makeRequest(setLoader, updateSubstance, payload, onSuccess, onError);
  };

  return (
    <>
      <div className="da-p-32">
      <Form
              layout="vertical"
              // labelCol={{ span: 7 }}
              initialValues={props.data}
              onFinish={onFinish}
            >
        <Row>
          <Col span={11}>
            <h5>Mandatory Declaration (ELiquid Edevice)</h5>
            
              <Form.Item
                name="quality_safety"
                label="Quality Safety Declaration"
                valuePropName="checked"
              >
                <Switch
                  defaultChecked={props.data.quality_safety}
                />
              </Form.Item>
              <Form.Item
                name="child_tamper_prof"
                label="Child Tamper prof Declaration"
                valuePropName="checked"
              >
                <Switch defaultChecked={props.data.child_tamper_prof} />
              </Form.Item>
              <Form.Item
                name="product_conformity"
                label="Product Confirmaty Declaration"
                valuePropName="checked"
              >
                <Switch
                  defaultChecked={props.data.product_conformity}
                />
              </Form.Item>
              <Form.Item
                name="non_risk"
                label="No Risk Declaration"
                valuePropName="checked"
              >
                <Switch defaultChecked={props.data.non_risk} />
              </Form.Item>
           
          </Col>
          <Col span={11}>
            <h5>Description</h5>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>
            </Form.Item>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>
            </Form.Item>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>
            </Form.Item>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <h5>Mandatory Declaration (ELiquids)</h5>
              <Form.Item
                name="consistent_design"
                label="Consistant Design Declaration"
                valuePropName="checked"
              >
                <Switch
                  defaultChecked={props.data.consistent_design}
                />
              </Form.Item>

              <Form.Item
                name="high_purity"
                label="High Purity Declaration"
                valuePropName="checked"
              >
                <Switch
                  defaultChecked={
                    props.data.high_purity
                  }
                />
              </Form.Item>
          </Col>
          <Col span={11}>
            <h5>Description</h5>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>
            </Form.Item>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>
            </Form.Item>
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
          </Col>
        </Row>
        </Form>

      </div>
    </>
  );
};

export default Mandatory;
