import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";

import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import IndexAttachment from "@mods/commons/attachments/IndexAttachment";

const pageConfig = {
  headers: {
    title: "Manage Facility",
    breadcrumb: [
      {
        name: "Facility",
        path: "/third-party/facilities"
      },
      {
        name: "Manage",
      }
    ]
  }

}

const EditFacility = () => {
  const { id } = useParams();

  const tabs = [
    {
      title: "Summary",
      content: <EditCompany id={ id } />
    },
    {
      title: "Attachments",
      content: <IndexAttachment type="Facilities" />
    },
    {
      title: "Changes",
      content: "Changes"
    }
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent>;
}

export default EditFacility;
