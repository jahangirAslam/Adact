import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";

import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import IndexAttachment from "@mods/commons/attachments/IndexAttachment";
import IndexFacility from "@mods/commons/facilities/IndexFacility";

const pageConfig = {
  headers: {
    title: "Manage Laboratory",
    breadcrumb: [
      {
        name: "Laboratories",
        path: "/third-party/laboratories"
      },
      {
        name: "Manage",
      }
    ]
  }

}

const EditLaboratory = () => {
  const { id } = useParams();

  const tabs = [
    {
      title: "Summary",
      content: <EditCompany id={ id } />
    },
    {
      title: "Locations",
      content: <IndexAttachment type="Laboratories" />
    },
    {
      title: "Contacts",
      content: <ContactIndex id={ id } type="Laboratories" />
    },
    {
      title: "Facility",
      content: <IndexFacility />
    }
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent>;
}

export default EditLaboratory;
