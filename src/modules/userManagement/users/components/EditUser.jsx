import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import { getUser } from "../requests";

import BasicInformation from "./edit/BasicInformation";
import Permission from "./edit/Permission";
import Setting from "./edit/Setting";


const pageConfig = {
  headers: {
    title: "Edit User",
    breadcrumb: [
      {
        name: "Users",
        path: "/user-management/users"
      },
      {
        name: "Edit",
      }
    ]
  }

}

const EditUser = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(true);

  const [data, setData] = useState({
    object: null,
    dependencies: []
  });



  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = () => {
    makeRequest(setLoader, getUser, id, onSuccess, onError);
  }

  const onSuccess = (res) => {
    setData(res);
  }


  const tabs = [
    {
      title: "Basic Information",
      content: <BasicInformation data={data.object} dependencies={data.dependencies} />
    },
    {
      title: "Permission",
      content: <Permission data={data.object} />
    },
    {
      title: "Setting",
      content: <Setting />
    }
  ]

  const onError = (res) => {
    // handle call failed error
  }

  if (data.length === 0) {
    return "";
  }
  return <TabComponent headers={pageConfig.headers} tabs={tabs} loader={loader}></TabComponent>;
}

export default EditUser;
