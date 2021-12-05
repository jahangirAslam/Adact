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

  const tabs = [
    {
      title: "Basic Information",
      content: <BasicInformation data={data.object} dependencies={data.dependencies} />
    },
    {
      title: "Permission",
      content: <Permission />
    },
    {
      title: "Setting",
      content: <Setting />
    }
  ]

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

  const onError = (res) => {
    // handle call failed error
  }


  return <TabComponent headers={pageConfig.headers} tabs={tabs} loader={loader}></TabComponent>;
}

export default EditUser;
