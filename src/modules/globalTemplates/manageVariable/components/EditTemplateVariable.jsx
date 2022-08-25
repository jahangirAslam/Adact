import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivityLog from "../../../componentManagement/chemicalCompounds/components/edits/ActivityLog"
import { getChemicalCompound } from "../requests";
import BasicInformation from "./edits/BasicInformation";
import Preview from './edits/Preview'

const pageConfig = {
  headers: {
    title: "Manage Global Templates Variable",
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


const EditTemplateVariable = () => {
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
    // {
    //   title: "Preview",
    //   content: (
    //     <Preview
    //       id={id}
    //       data={data.object}
    //       dependencies={data.dependencies}
    //     />
    //   ),
    // },
    
    {
      title: "Activity Logs",
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

export default EditTemplateVariable;
