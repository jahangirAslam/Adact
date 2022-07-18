import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";
import AcountSetting from "../../../commons/Account Setting/AcountSetting"
import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import IndexDocument from "@mods/documentManagement/documents/IndexDocument";

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
      content: <EditCompany id={ id } />
    },
    {
      title: "Contacts",
      content: <ContactIndex id={ id } type="Agent" />
    },
    {
      title: "Documents",
      content: <IndexDocument id={ id } type="Agent" />
    },
    {
      title: "Account Setting",
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
