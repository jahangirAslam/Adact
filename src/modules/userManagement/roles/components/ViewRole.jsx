import {  HeaderComponent } from "@comps/components";
import { Form, Input,Checkbox,Collapse ,Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "@utils/helpers";
import { getRole } from "../requests.js";

const pageConfig = {
  headers: {
    title: "View Role",
    breadcrumb: [
      {
        name: "Roles",
        path: "/user-management/roles"
      },
      {
        name: "View",
      }
    ]
  }

}

const ViewRole = (props) => {
  const [data,setData] = useState([]);
  const { Panel } = Collapse;
  const { id } = useParams();

  useEffect(() => {
    
    getData();
    
    // eslint-disable-next-line
  }, []);
const  getData = () => {
  makeRequest(Function, getRole, id, onViewSuccess, Function);
}

const onViewSuccess = (res) =>{
  setData(res);
}
const modules = (module) => {
  return(
    <>
    {module.map((res,key)=>
      <Collapse key={key}>
      <Panel header={res.name}>
      <div className="mb-2 fs-2">
      <Row>
      <Col span={5}><Checkbox disabled={true}> Index</Checkbox></Col>
      <Col span={5}><Checkbox disabled={true}> Create</Checkbox></Col>
      <Col span={5}><Checkbox disabled={true}> View</Checkbox></Col>
      <Col span={5}><Checkbox disabled={true}> Update</Checkbox></Col>
      <Col span={4}><Checkbox disabled={true}> Delete</Checkbox></Col>
    </Row>
      </div>
        {res.children ? modules(res.children) : null}
      </Panel>
      </Collapse>
      )}
      </>
  );
}
if(data.length===0){
  return "";
}
  return (
    <>
    <HeaderComponent headers={pageConfig.headers}/>
    <div className="mr-5 ml-5">
    <Form
      layout="horizontal"
      labelCol={{ span: 3 }}
      initialValues={data.object}
    >
    
      <Form.Item  name="name" label="Name :" className="da-mb-16">
        <Input disabled={true}/>
      </Form.Item>
    </Form>
    
    {modules(data.modules)}
  </div>
    </>
  );
}

export default ViewRole;
