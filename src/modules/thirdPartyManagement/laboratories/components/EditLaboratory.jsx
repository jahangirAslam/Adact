import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";

import EditCompany from "@mods/commons/companies/components/EditCompany";
import LocationIndex from "@mods/commons/locations/IndexLocation";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import { GetSettings } from "@mods/commons/settings/GetSettings";

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
      content: <EditCompany id={id}/>
    },
    {
      title: "Locations",
      content: <LocationIndex id={id} type="Laboratories"/>
    },
    {
      title: "Contacts",
      content: <ContactIndex id={id} type="Laboratories"/>
    },
    {
      title: "Settings",
      content: <GetSettings group="laboratories" />
    },
    {
      title: "Attachments",
      content: "Attachments"
    },
    {
      title: "Products",
      content: "Products"
    },
    {
      title: "Brands",
      content: "Brands"
    },
    {
      title: "Submissions",
      content: "Submissions"
    },
    {
      title: "Changes",
      content: "Changes"
    }
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent> ;
}

export default EditLaboratory;
