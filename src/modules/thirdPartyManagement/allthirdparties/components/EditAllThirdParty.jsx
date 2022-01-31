import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";

import EditCompany from "@mods/commons/companies/components/EditCompany";
import LocationIndex from "@mods/commons/locations/IndexLocation";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import { GetSettings } from "@mods/commons/settings/GetSettings";

const pageConfig = {
  headers: {
    title: "Manage ThirdParty",
    breadcrumb: [
      {
        name: "All Third Partys",
        path: "/third-party/all-third-parties"
      },
      {
        name: "Manage",
      }
    ]
  }

}

const EditAllThirdParty = () => {
  const { id } = useParams();

  const tabs = [
    {
      title: "Summary",
      content: <EditCompany id={id}/>
    },
    {
      title: "Locations",
      content: <LocationIndex id={id} type="AllThirdParties"/>
    },
    {
      title: "Contacts",
      content: <ContactIndex id={id} type="AllThirdParties"/>
    },
    {
      title: "Settings",
      content: <GetSettings group="ThirdParties" />
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

export default EditAllThirdParty;
