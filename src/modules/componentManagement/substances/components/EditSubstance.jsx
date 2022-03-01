import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import BasicInformation from "./edits/BasicInformation";
import { getSubstance } from "./../requests";

const pageConfig = {
  headers: {
    title: "Manage Substance",
    breadcrumb: [
      {
        name: "Substances",
        path: "/component-management/substances"
      },
      {
        name: "Manage",
      }
    ]
  }

}


const EditSubstance = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState('');
  useEffect(() => {
    makeRequest(setLoader, getSubstance, id, substanceSuccess, Function);
    // eslint-disable-next-line
}, []);

const substanceSuccess = (res) =>{
  setData(res.object);
}

  const tabs = [
    {
      title: "Summary",
      content: <BasicInformation id={id} data={data}/>
    }
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs } loader={loader}></TabComponent> ;
}

export default EditSubstance;
