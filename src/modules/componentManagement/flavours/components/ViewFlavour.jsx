import { TabComponent } from "@comps/components";
import { makeRequest,notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicInformation from "./BasicInformation";
import { getFlavour } from "./request";




const pageConfig = {
  headers: {
    title: "View Flavour",
    breadcrumb: [
      {
        name: "Falvours",
        path: "/component-management/flavours"
      },
      {
        name: "View",
      }
    ]
  }

}

const ViewFlavour = () => {
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
    makeRequest(setLoader, getFlavour, id, onSuccess, onError);
  }

  const onSuccess = (res) => {
    setData(res);
  }


  const tabs = [
    {
      title: "Basic Information",
      content: <BasicInformation data={data.object} dependencies={data.dependencies} disable={true} />
    },

  ]

  const onError = (error, msg) => {
    notify(msg.message)
}

  if (data.length === 0) {
    return "";
  }
  return <TabComponent headers={pageConfig.headers} tabs={tabs} loader={loader}></TabComponent>;
}

export default ViewFlavour;
