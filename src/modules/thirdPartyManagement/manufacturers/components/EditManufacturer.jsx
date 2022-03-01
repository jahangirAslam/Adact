import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";

import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import IndexDocument from "@mods/documentManagement/documents/IndexDocument";
import { GetSettings } from "@mods/commons/settings/GetSettings";

const pageConfig = {
  headers: {
    title: "Manage Manufacturer",
    breadcrumb: [
      {
        name: "Manufacturers",
        path: "/third-party/manufacturers"
      },
      {
        name: "Manage",
      }
    ]
  }

}

const EditManufacturer = () => {
  const { id } = useParams();

  const tabs = [
    {
      title: "Summary",
      content: <EditCompany id={ id } />
    },
    {
      title: "Contacts",
      content: <ContactIndex id={ id } type="manufacturers" />
    },
    {
      title: "Documents",
      content: <IndexDocument/>
    },
    {
      title: "Settings",
      content: <GetSettings group="manufacturers" />
    },
    {
      title: "Changes",
      content: "Changes"
    }
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent>;
}

export default EditManufacturer;
