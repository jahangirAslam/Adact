import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HeaderComponent, ButtonComponent } from "@comps/components";
import { makeRequest, notify, getErrorProps } from "@utils/helpers";
import { getRole, updateRole } from "../requests";
import { Form, Input, Row, Col } from "antd";
import GetPermissions from "../../rolePermission/GetPermissions";


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

  const onError = (err) => {
    let errorList = [];
    errorList['name'] = err.name;
    setErrors(errorList);
  }

  if (data.length === 0) {
    return "";
  }
  return (
    <>
      <HeaderComponent headers={pageConfig.headers} />
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

        <GetPermissions data={data} modules={data.modules} disable={false} />
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
