import { HeaderComponent } from "@comps/components";
import { Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "@utils/helpers";
import { getRole } from "../requests.js";
import GetPermissions from "../../rolePermission/GetPermissions";

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
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {

    getData();

    // eslint-disable-next-line
  }, []);

  const getData = () => {
    makeRequest(Function, getRole, id, onViewSuccess, Function);
  }

  const onViewSuccess = (res) => {
    setData(res);
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
          labelCol={{ span: 3 }}
          initialValues={data.object}
        >

          <Form.Item name="name" label="Name :" className="da-mb-16">
            <Input disabled={true} />
          </Form.Item>
        </Form>

        <GetPermissions data={data} modules={data.modules} disable={true} />
      </div>
    </>
  );
}

export default ViewRole;
