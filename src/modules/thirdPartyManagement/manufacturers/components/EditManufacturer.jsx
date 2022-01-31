import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";

import EditCompany from "@mods/commons/companies/components/EditCompany";
import LocationIndex from "@mods/commons/locations/IndexLocation";
import ContactIndex from "@mods/commons/contacts/IndexContact";
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
      content: <EditCompany id={id}/>
    },
    {
      title: "Locations",
      content: <LocationIndex id={id} type="manufacturers"/>
    },
    {
      title: "Contacts",
      content: <ContactIndex id={id} type="manufacturers"/>
    },
    {
      title: "Settings",
      content: <GetSettings group="manufacturers" />
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

export default EditManufacturer;
