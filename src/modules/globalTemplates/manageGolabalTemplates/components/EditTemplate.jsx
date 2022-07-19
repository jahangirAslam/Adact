import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChemicalCompound } from "../requests";
import BasicInformation from "./edits/BasicInformation";

const pageConfig = {
  headers: {
    title: "Manage Global Templates",
    breadcrumb: [
      {
        name: " Global Templates",
        path: "/global-template/manage-global-templates"
      },
      {
        name: "Test",
      }
    ]
  }

}


const EditTemplate = () => {
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
      title: "Subject",
      content: (
        <BasicInformation
          id={id}
          data={data.object}
          dependencies={data.dependencies}
        />
      ),
    },
   
    
   
  ];

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs } loader={loader}></TabComponent> ;
}

export default EditTemplate;
