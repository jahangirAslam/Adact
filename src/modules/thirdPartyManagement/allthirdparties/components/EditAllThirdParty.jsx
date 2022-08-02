import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";

import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import LocationIndex from "@mods/commons/locations/IndexLocation";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import IndexAttachment from "@mods/commons/attachments/IndexAttachment";
import  IndexBrand  from "@mods/commons/brands/IndexBrand";
import { GetSettings } from "@mods/commons/settings/GetSettings";
import AcountSetting from "../../../commons/Account Setting/AcountSetting";
import IndexProduct from "../../../commons/product/IndexProduct";
import Submission from "../../../products/allProducts/components/editProduct/submission/recipe/Submission";
import Business from "../../../commons/Business/Business";
import SummaryIcon from "../../../../containers/components/menu/icons/SummaryIcon";
import ContactIcon from "../../../../containers/components/menu/icons/ContactIcon";
import LocationIcon from "../../../../containers/components/menu/icons/LocationIcon";
import SettingsIcon from "../../../../containers/components/menu/icons/SettingsIcon";

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
      icon: <SummaryIcon />,
      content: <EditCompany id={ id } type="allThirdParty" />
    },
    {
      title: "Business Details",
      icon: <ContactIcon />,
      content: <Business id={ id } type="AllThirdParties" />
    },
    {
      title: "Locations",
      icon: <LocationIcon />,
      content: <LocationIndex id={ id } type="AllThirdParties" />
    },
    {
      title: "Contacts",
      icon: <ContactIcon />,
      content: <ContactIndex id={ id } type="AllThirdParties" />
    },
    // {
    //   title: "Settings",
    //   content: <GetSettings group="ThirdParties" />
    // },
    // {
    //   title: "Attachments",
    //   content: <IndexAttachment type="AllThirdParties" />
    // },
    {
      title: "Account Settings",
      icon:<SettingsIcon/>,
      content: <AcountSetting type="AllThirdParties" />
    },
    // {
    //   title: "Products",
    //   content: <IndexProduct type="AllThirdParties" />
    // },
    // {
    //   title: "Products",
    //   content: "Products"
    // },
    // {
    //   title: "Brands",
    //   content: <IndexBrand type="customers" />
    // },
    // {
    //   title: "Submissions",   
    //   content: <Submission type="customers" />
    // },
    // {
    //   title: "Changes",
    //   content: "Changes"
    // }
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent>;
}

export default EditAllThirdParty;
