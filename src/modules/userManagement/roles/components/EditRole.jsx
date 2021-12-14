import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  HeaderComponent,ButtonComponent } from "@comps/components";
import { makeRequest,notify,getErrorProps } from "@utils/helpers";
import { getRole,updateRole,createPermission ,deletePermission} from "../requests";
import { Form, Input,Checkbox,Collapse ,Row, Col } from "antd";


const pageConfig = {
  headers: {
    title: "Edit Roles",
    breadcrumb: [
      {
        name: "Roles",
        path: "/user-management/roles"
      },
      {
        name: "Edit",
      }
    ]
  }

}

const EditRole = () => {
  const { id } = useParams();
  const { Panel } = Collapse;
  const [loader, setLoader] = useState(true);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = () => {
    makeRequest(setLoader, getRole, id, onDataSuccess, onError);
  }

  const onDataSuccess = (res) => {
    setData(res);
  }


  const onFinish = (payload) => {
    payload.id = data.object.id;
    makeRequest(setLoader, updateRole, payload, onSuccess, onError);
  }

  const onSuccess = (res, response) => {
    notify("User", response.msg);
  }

  const onPermissionDeleteSuccess = (res, response) => {
    getData();
    notify("Permission", response.msg);
  }

  const onPermissionCreateSuccess = (res, response) => {
    getData();
    notify("Permission", response.msg);
  }

  const onPermissionError = (res, response) => {
    notify("Permission", res.message);
  }

  const onError = (err, error) => {
    let errorList = [];
    errorList['name'] = err.name;
    setErrors(errorList);
  }

  const checkPermission = (permission, module, action) =>{
    return permission.filter(x => x.role_id === data.object.id && x.module_id === module && x.action_id===action);
  }

  const permission = (action, module, event, permission) => {
    let payload = {"object":{"role_id": data.object.id, "module_id": module.id, "action_id": action.id}};
    if(event.currentTarget.checked){
      makeRequest(setLoader, createPermission, payload, onPermissionCreateSuccess, onPermissionError);
    }else{
      var index =  checkPermission(permission, payload.object.module_id, payload.object.action_id);
      index.length<1 ?  notify("Permission", "Permission not found"):
        makeRequest(setLoader, deletePermission, index[0].id, onPermissionDeleteSuccess, onPermissionError);
    }
  }

  const modules = (module) => {
    return(
      <>
      {module.map((eachModule, i)=>
        <Collapse key={i}>
        <Panel header={eachModule.name}>
        <div className="da-mt-10">
        {eachModule.actions ?
        <Row>
          {eachModule.actions.map((action,i)=>
        <Col span={4} key={i}><Checkbox checked={checkPermission(eachModule.permission, eachModule.id, action.id).length>0 ? true : false} onClick={(event) => permission(action, eachModule, event, eachModule.permission)}> {action.name}</Checkbox></Col>
        )}
      </Row>
      : null }
        </div>
          {eachModule.children ? modules(eachModule.children) : null}
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
    <div className="da-mr-64 da-ml-64 da-mt-48">
    <Form
      layout="horizontal"
      labelCol={{ span: 2 }}
      initialValues={data.object}
      onFinish={onFinish}
    >
      <Row>

      <Col span={20}>
      <Form.Item name="name" rules={rules.name} label="Name :" className="da-mb-16"
        {...getErrorProps(errors['name'])}
      >
        <Input />
      </Form.Item>
      </Col>
      <Col span={4}>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <ButtonComponent className="da-mr-10" type="primary" htmlType="submit" state={loader}>Update Name</ButtonComponent>
      </Form.Item>
      </Col>
      </Row>
    </Form>
    {modules(data.modules)}
    </div>
    </>
  );
}

export default EditRole;
const rules = {
  name: [
    { required: true, message: 'Please input your Role Name!', },
    { min: 3, message: 'Minimum Role Name length is 3', },
    { max: 100, message: 'Maximum Role Name length is 100', },
  ]
};
