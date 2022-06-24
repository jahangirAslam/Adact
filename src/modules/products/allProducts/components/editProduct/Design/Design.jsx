import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  ActionComponent,
  BodyComponent,
  CreateButton,
  FilterComponent,
  SelectionTable,
} from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { ButtonComponent } from "@comps/components";
import { Col, Form, Input, Row, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateRecipe from "./CreateTest";
import {
  createFlavour,
  deleteFlavour,
  getFilters,
  getFlavours,
} from "./request";
import { InputNumber, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";

const onChange = (value) => {
  console.log("changed", value);
};
const Design = (props) => {
  var delItems = [];
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [filters, setFilters] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    sortName: "id",
    sortType: "desc",
  });

  const [childComponent, setChildComponent] = useState(null);
  const ActionComponentEx = (record) => {
    let icon = null;
    if (record) {
      if (record.is_active) {
        icon = <CloseOutlined className="icon-style da-text-color-danger-1" />;
      } else {
        icon = <CheckOutlined className="icon-style da-text-color-success-1" />;
      }
    }
    return (
      <ActionComponent
        each={record}
        onDelete={onDelete}
        onEdit={onEdit}
        onView={onView}
      ></ActionComponent>
    );
  };

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

  //deleted multi Items
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      delItems = [];
      delItems = selectedRowKeys;
    },
  };
  // Create component modal
  const onCreate = () => {
    setChildComponent(
      <CreateRecipe onCreated={onCreated} product_id={props.product_id} />
    );
  };

  const onCreated = (res) => {
    if (res) {
      history.push(`/products/product-test/edit/${res.data.object.id}`);
    }
    setChildComponent(null);
  };

  const onEdit = (record) => {
    history.push(`/products/product-test/edit/${record.id}`);
  };
  const onView = (record) => {
    history.push(`/products/product-test/view/${record.id}`);
  };
  const onDelete = (record) => {
    let index = delItems.findIndex((o) => o === record.id);
    if (index === -1) {
      delItems.push(record.id);
    }
    const payload = { ids: delItems };
    makeRequest(setLoader, deleteFlavour, payload, onDeleteSuccess, onError);
  };
  const handleTableChange = (page, fil, sorter) => {
    let payload = {
      ...pagination,
      current: page.current,
      pageSize: page.pageSize,
      sortName: sorter.field || "id",
      sortType: sorter.order === "ascend" ? "asc" : "desc",
    };
    setPagination(payload);
  };
  const onDeleteSuccess = (response, msg) => {
    getAllFlavours();
    notify(msg.msg);
  };

  const onError = (error, msg) => {
    //
  };
  const onFinish = (data) => {
    debugger;
    let load = {
      product_id: props.product_id,
      laboratory_id: data.laboratory_id,
      type: data.type,
      facility_id: data.facility_id,
      created_by: 1,
      status: "new",
    };

    let payload = { object: load };
    makeRequest(setLoader, createFlavour, payload, onSuccess);
  };
  return (
    <>
      {childComponent}
      <Row justify="space-between" className="da-pb-24">
        <Col className="inner-form-heading">
          <h4>Product Design</h4>
        </Col>
        <CreateButton onClick={onCreate} />
      </Row>
      <BodyComponent>
      <Form
            layout="vertical"
            // labelCol={{ span: 7 }}
            initialValues={props.data}
            onFinish={onFinish}
        >
            <Row gutter={[16, 24]}>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={8} >
                    <h5 className="discription-details">Product Description</h5>
                <Form.Item
                        name="description"
                        label="Description :"
                    >
                <TextArea rows={100} placeholder="maxLength is 6" maxLength={1000} />

                        
                    </Form.Item>
                </Col>
            <Col className="gutter-row" xs={24} md={12} lg={16} >
                <h5>Product Dimensions</h5>
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" xs={24} md={12} lg={8} >
                    <Form.Item
                        name="product_length"
                        label="Length mm :"
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                    <Col className="gutter-row" xs={24} md={12} lg={8} >

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
                </Col>
            </Row>

            {/* nEW rOW  */}
            <Row gutter={[16, 24]}>
            <Col className="gutter-row electric-substance " xs={24} md={12} lg={24} >
                <div className="electric-substance">
                <h5>Electric Products</h5>
                </div>
            </Col>
            <Row gutter={[16, 24]}>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
            <Form.Item name="battery_type" label="Battery Type ">
                        <Input />
                    </Form.Item>
                </Col>
             <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
             <Form.Item name="battery_type_capacity" label="Battery Type Capacity">
                        <Input />
                    </Form.Item>
            </Col>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
            <Form.Item name="volt_watt_adjustable" label="Volt Watt Adjustable">
                        <Input />
                    </Form.Item>
            </Col>
             <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
             <Form.Item name="e_cig_device_idcid" label="E-Cig Device ID">
                        <Input />
                    </Form.Item>
            </Col>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={4} >
             
            </Col>
            </Row>

            {/* new Row */}
            <Row gutter={[16, 24]}>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
            <Form.Item name="voltage" label=" Voltage(V) ">
                        <Input />
                    </Form.Item>
                </Col>
             <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
             <Form.Item name="voltage_lower_range_v" label="Voltage Lower Range (v)">
                        <Input />
                    </Form.Item>
            </Col>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
            <Form.Item name="voltage_upper_range_v" label="Voltage upper Range (v)">
                        <Input />
                    </Form.Item>
            </Col>
             <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
             <Form.Item name="coil_resistance" label="Coil Resistance">
                        <Input />
                    </Form.Item>
            </Col>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={4} >
             
            </Col>

            </Row>
                {/* new Row */}
            <Row gutter={[16, 24]}>

            <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
            <Form.Item name="wattage" label=" Wattage (W) ">
                        <Input />
                    </Form.Item>
                </Col>
             <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
             <Form.Item name="voltage_lower_range_w" label="Voltage Lower Range (W)">
                        <Input />
                    </Form.Item>
            </Col>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
            <Form.Item name="ecid" label="Voltage upper Range (W)">
                        <Input />
                    </Form.Item>
            </Col>
             <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
             <Form.Item name="coil_composition" label="Coil Composition">
                        <Input />
                    </Form.Item>
            </Col>
            <Col className="gutter-row discription-area" xs={24} md={12} lg={5} >
             
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
                    Save
                </ButtonComponent>
            </Form.Item>
        </Form>
      </BodyComponent>
    </>
  );
};

export default Design;

const availableFilters = [
  {
    key: "laboratory_name",
    placeholder: " Battery Type ",
    type: "select",
    data_key: "laboratory",
  },
  {
    key: "customer_name",
    placeholder: "Battery Capacity",
    type: "select",
    data_key: "customers",
  },
  {
    key: "product_name",
    placeholder: "Volt Watt adjustable",
    type: "select",
    data_key: "product_name",
  },
  {
    key: "test_ref",
    placeholder: "e-cig device ID",
    type: "text",
  },
  {
    key: "type",
    placeholder: "Voltage",
    type: "select",
    data_key: "types",
  },
  {
    key: "status",
    placeholder: "Voltage Upper Range",
    type: "select",
    data_key: "status",
  },
  {
    key: "current",
    placeholder: "Voltage lower Range",
    type: "select",
    data_key: "current",
  },
  {
    key: "current",
    placeholder: "Coil Resistance",
    type: "select",
    data_key: "current",
  },
  {
    key: "current",
    placeholder: "Wattage",
    type: "select",
    data_key: "current",
  },
  {
    key: "status",
    placeholder: "Voltage Upper Range",
    type: "select",
    data_key: "status",
  },
  {
    key: "current",
    placeholder: "Voltage lower Range",
    type: "select",
    data_key: "current",
  },
  {
    key: "current",
    placeholder: "Coil Composition",
    type: "select",
    data_key: "current",
  },
];
