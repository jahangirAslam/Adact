import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TabComponent } from "@comps/components";
import { makeRequest,notify } from "@utils/helpers";
import { getUser } from "../requests";

import BasicInformation from "./view/BasicInformation";
import Permission from "./view/Permission";
import { GetSettings } from "@mods/commons/settings/GetSettings";
import ActivityLog from "@mods/commons/activityLogs/ActivityLog";


const pageConfig = {
  headers: {
    title: "View User",
    breadcrumb: [
      {
        name: "Users",
        path: "/user-management/users"
      },
      {
        name: "View",
      }
    ]
  }

}

const ViewUser = () => {
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
      content: <BasicInformation data={data.object} dependencies={data.dependencies} disable={true} />
    },
    {
      title: "Permission",
      content: <Permission data={data.object} disable={true} />
    },
    {
      title: "Setting",
      content: <GetSettings disable={true} group="users" />
    },
    {
      title: "Activity Logs",
      content: <ActivityLog logs={data.activities} />
    }
  ]

  const onError = (error, msg) => {
    notify(msg.message);
  };


  if (data.length === 0) {
    return "";
  }
  return <TabComponent headers={pageConfig.headers} tabs={tabs} loader={loader}></TabComponent>;
}

export default ViewUser;
