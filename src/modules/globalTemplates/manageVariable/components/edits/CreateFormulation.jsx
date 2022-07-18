import React, { useEffect, useState } from "react";
import { Col, Form, Input, InputNumber, Row, Select, Switch } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify,makeRequestStateless } from "@utils/helpers";
import { createFlavour,getProductDependencies } from "./components/request";
import { useParams } from "react-router-dom";


const formName = "createChemicalCompound";
const CreateFormulation = (props) => {

  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  // for dependancy
  const [deps, setDeps] = useState({

    compounds: [],
    substances: [],
    


});
const {id} = useParams()
  const onFinish = (data) => {
    debugger
    const load = {
      substance_id: id,
      type : "substance",
      ...data
    }
    let payload = { "object": load }
    makeRequest(setLoader, createFlavour, payload, onSuccess, onError);
  }

  const onSuccess = (data, res) => {
    notify("Chemical Compound Created", res.msg);
    props.onCreated(res);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['name'] = err.name;
    setErrors(errorList);
  }
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  //  for dependacy
  const getSelectFieldsData = () => {
    makeRequestStateless(getProductDependencies, null, onDependencySuccess, null);

}
useEffect(() => {
  getSelectFieldsData();
  // eslint-disable-next-line
}, []);

const onDependencySuccess = (data, res) => {
  setDeps({
      compounds: data.compounds,
      substances: data.substances,
      

  });


}

  // ------------------------------------
  // Start footer buttons array
  // ------------------------------------
  const footer = [
    <SaveButton form={formName} key="create_button" htmlType="submit" state={loader} />,
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  return (
    <ModalComponent
      mainTitle="Create"
      subTitle="Substance"
      visible={true}
      footer={footer}
      onCancel={() => props.onCreated(false)}
    >
      <Form layout="vertical" 
       initialValues={props.availblePercentage}
      name={formName} onFinish={onFinish}>
        <Row>
            <Col span={24}>
            <Form.Item name="compound_id" label="Select Components :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Components"
                        options={deps.compounds}
                    />
                </Form.Item>
            </Col>
            
            <Row justify="space-between" >
                    <Col span="10" >

                        <Form.Item  name="percentage" label="Add Percentage" placeholder="Percentage" className="da-mb-16"
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span="3"  >
                        <Row align="center" justify="" className="ap-d" >
                            <h1>/</h1>
                        </Row>
                    </Col>

                    <Col span="10" >

                        <Form.Item label="Available Percentage :" className="da-mb-16">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col span="10" >

                        <Form.Item label="Substance name  :" className="da-mb-16">
                            <Input  />
                        </Form.Item>
                    </Col>
                    <Col span="10" >

                        <Form.Item label="CAS Number :" className="da-mb-16">
                            <Input  />
                        </Form.Item>
                    </Col>

                </Row>  
        <Col span={12}>
        <Form.Item
         label="After Adding Components"
          className="da-mb-16"
          {...getErrorProps(errors["name"])}
        >
            <Switch defaultChecked onChange={onChange}/>;
        </Form.Item>
        </Col>
        </Row>
      </Form>
    </ModalComponent>
  );
}

export default CreateFormulation

const rules = {
  name: [
    { required: true, message: "Please input your name!" },
    { min: 3, message: "Minimum name length is 3" },
    { max: 100, message: "Maximum name length is 100" },
  ],
  reference: [
    { required: true, message: "Please input reference!" },
    { min: 3, message: "Minimum name length is 3" },
    { max: 100, message: "Maximum name length is 100" },
  ],
};
