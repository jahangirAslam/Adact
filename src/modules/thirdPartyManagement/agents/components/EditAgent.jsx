import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";
import AcountSetting from "../../../commons/Account Setting/AcountSetting"
import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import IndexDocument from "@mods/documentManagement/documents/IndexDocument";
import SummaryIcon from "../../../../containers/components/menu/icons/SummaryIcon";
import ContactIcon from "../../../../containers/components/menu/icons/ContactIcon";
import DocumentsIcon from "../../../../containers/components/menu/icons/DocumentsIcon";
import SettingsIcon from "../../../../containers/components/menu/icons/SettingsIcon";

const pageConfig = {
  headers: {
    title: "Manage Agent",
    breadcrumb: [
      {
        name: "Agent",
        path: "/third-party/agents"
      },
      {
        name: "Manage",
      }
    ]
  }

}

const EditAgent = () => {
  const { id } = useParams();

  const tabs = [
    {
      title: "Summary",
      icon: <SummaryIcon />,
      content: <EditCompany id={ id } />
    },
    {
      title: "Contacts",
      icon: <ContactIcon />,
      content: <ContactIndex id={ id } type="Agent" />
    },
    {
      title: "Documents",
      icon:<DocumentsIcon/>,
      content: <IndexDocument id={ id } type="Agent" />
    },
    {
      title: "Account Settings",
      icon:<SettingsIcon/>,
      content: <AcountSetting id={ id } type="Agent" />
    }
    // {
    //   title: "Changes",
    //   content: "Changes"
    // }
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent>;
}

export default EditAgent;
