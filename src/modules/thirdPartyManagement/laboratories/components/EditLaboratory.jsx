import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";
import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import IndexAttachment from "@mods/commons/attachments/IndexAttachment";
import IndexFacility from "@mods/commons/facilities/IndexFacility";
import Business from "../../../commons/Business/Business";
import SummaryIcon from "../../../../containers/components/menu/icons/SummaryIcon";
import ContactIcon from "../../../../containers/components/menu/icons/ContactIcon";
import ThirdPartyIcon from "../../../../containers/components/menu/icons/ThirdPartyIcon";

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
      icon: <SummaryIcon />,
      content: <EditCompany id={ id } type="laboratory" />
    },
    // {
    //   title: "Locations",
    //   content: <IndexAttachment type="Laboratories" />
    // },
    {
      title: "Contact Details",
      icon: <ContactIcon />,
      content: <Business id={id} type="Laboratories"/>
    },
    {
      title: "Contacts",
      icon: <ContactIcon />,
      content: <ContactIndex id={ id } type="Laboratories" />
    },
    
    {
      title: "Facilities",
      icon: <ThirdPartyIcon />,
      content: <IndexFacility />
    }
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent>;
}

export default EditLaboratory;
