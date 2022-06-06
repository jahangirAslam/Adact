import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";

import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import LocationIndex from "@mods/commons/locations/IndexLocation";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import IndexAttachment from "@mods/commons/attachments/IndexAttachment";
import  IndexBrand  from "@mods/commons/brands/IndexBrand";
import { GetSettings } from "@mods/commons/settings/GetSettings";
import SummaryIcon from "../../../../containers/components/menu/icons/SummaryIcon";
import LocationIcon from "../../../../containers/components/menu/icons/LocationIcon";

const pageConfig = {
  headers: {
    title: "Manage Customer",
    breadcrumb: [
      {
        name: "Customers",
        path: "/third-party/customers"
      },
      {
        name: "Manage",
      }
    ]
  }

}

const EditCustomer = () => {
  const { id } = useParams();

  const tabs = [
    {
      title: "Summary",
      icon: <SummaryIcon />,
      content: <EditCompany id={ id } />
    },
    {
      title: "Locations",
      icon:<LocationIcon/>,
      content: <LocationIndex id={ id } type="customers" />
    },
    {
      title: "Contacts",
      content: <ContactIndex id={ id } type="customers" />
    },
    {
      title: "Settings",
      content: <GetSettings group="customers" />
    },
    {
      title: "Attachments",
      content: <IndexAttachment type="customers" />
    },
    {
      title: "Products",
      content: "Products"
    },
    {
      title: "Brands",
      content: <IndexBrand type="customers" />
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

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent>;
}

export default EditCustomer;
