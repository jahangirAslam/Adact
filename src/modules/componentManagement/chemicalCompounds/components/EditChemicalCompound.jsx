import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import BasicInformation from "./edits/BasicInformation";
import { getChemicalCompound } from "../requests";
import ActivityLog from "./edits/ActivityLog";
import Formulation from "./edits/Formulation";

const pageConfig = {
  headers: {
    title: "Test ",
    breadcrumb: [
      {
        name: "Manage Chemical Compounds ",
        path: "/global-template/manage-global-templates"
      },
      {
        name: "Test",
      }
    ]
  }

}


const EditChemicalCompound = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    object: {},
    dependencies: [],
  });
  const [loader, setLoader] = useState('');
  useEffect(() => {
    makeRequest(setLoader, getChemicalCompound, id, chemicalCompoundSuccess, Function);
    // eslint-disable-next-line
}, []);

const chemicalCompoundSuccess = (res) =>{
  setData(res);
}

  const tabs = [
    {
      title: "Summary",
      content: (
        <BasicInformation
          id={id}
          data={data.object}
          dependencies={data.dependencies}
        />
      ),
    },
    {
      title: "Formulation",
      content: (
        <Formulation
          id={id}
          data={data.object}
          dependencies={data.dependencies}
        />
      ),
    },
    
    {
      title: "ActivityLog",
      content: (
        <ActivityLog
          id={id}
          data={data.object}
          dependencies={data.dependencies}
        />
      ),
    },
  ];

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs } loader={loader}></TabComponent> ;
}

export default EditChemicalCompound;
