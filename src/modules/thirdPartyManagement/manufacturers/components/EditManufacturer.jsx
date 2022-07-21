import { TabComponent } from "@comps/components";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import IndexDocument from "@mods/documentManagement/documents/IndexDocument";
import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import { useParams } from "react-router-dom";
import ContactIcon from "../../../../containers/components/menu/icons/ContactIcon";
import SettingsIcon from '../../../../containers/components/menu/icons/SettingsIcon';
import DocumentsIcon from '../../../../containers/components/menu/icons/DocumentsIcon';
import SummaryIcon from "../../../../containers/components/menu/icons/SummaryIcon";
import ThirdPartyIcon from "../../../../containers/components/menu/icons/ThirdPartyIcon";
import AcountSetting from "../../../commons/Account Setting/AcountSetting";
import Business from "../../../commons/Business/Business";

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
      icon: <SummaryIcon />,
      content: <EditCompany id={ id } />
    },
    {
      title: "Contact Details",
      icon: <ThirdPartyIcon />,
      content: <Business group="manufacturers" />
      
    },
    {
      title: "Contacts",
      icon: <ContactIcon />,
      content: <ContactIndex id={ id } type="manufacturers" />
    },
    {
      title: "Documents",
      icon:<DocumentsIcon/>,
      content: <IndexDocument/>
    },
    
    {
      title: "Account Setting",
      icon:<SettingsIcon/>,
      content: <AcountSetting id={ id } />
    },
    // {
    //   title: "Changes",
    //   content: "Changes"
    // }
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent>;
}

export default EditManufacturer;
