import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";

import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";

import LocationIndex from "@mods/commons/locations/IndexLocation";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import IndexAttachment from "@mods/commons/attachments/IndexAttachment";
import IndexBrand from "@mods/commons/brands/IndexBrand";
import { GetSettings } from "@mods/commons/settings/GetSettings";
import SummaryIcon from "../../../../containers/components/menu/icons/SummaryIcon";
import LocationIcon from "../../../../containers/components/menu/icons/LocationIcon";
import ContactIcon from "../../../../containers/components/menu/icons/ContactIcon";
import SettingsIcon from "../../../../containers/components/menu/icons/SettingsIcon";
import ProductsIcon from "../../../../containers/components/menu/icons/ProductsIcon";
import Business from "../../../commons/Business/Business";
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
      content: <EditCompany id={id} />
    },
    {
      title: "Business Details",
      icon: <SummaryIcon />,
      content: <Business id={id} />
    },
    {
      title: "Locations",
      icon: <LocationIcon />,
      content: <LocationIndex id={id} type="customers" />
    },
    {
      title: "Contacts",
      icon: <ContactIcon />,
      content: <ContactIndex id={id} type="customers" />
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      content: <GetSettings group="customers" />
    },
    {
      title: "Attachments",
      icon:
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C15.3261 0 16.5979 0.526784 17.5355 1.46447C18.4732 2.40215 19 3.67392 19 5V17C19 17.9193 18.8189 18.8295 18.4672 19.6788C18.1154 20.5281 17.5998 21.2997 16.9497 21.9497C16.2997 22.5998 15.5281 23.1154 14.6788 23.4672C13.8295 23.8189 12.9193 24 12 24C11.0807 24 10.1705 23.8189 9.32122 23.4672C8.47194 23.1154 7.70026 22.5998 7.05025 21.9497C6.40024 21.2997 5.88463 20.5281 5.53284 19.6788C5.18106 18.8295 5 17.9193 5 17V9H7V17C7 18.3261 7.52678 19.5979 8.46447 20.5355C9.40215 21.4732 10.6739 22 12 22C13.3261 22 14.5979 21.4732 15.5355 20.5355C16.4732 19.5979 17 18.3261 17 17V5C17 4.60603 16.9224 4.21593 16.7716 3.85195C16.6209 3.48797 16.3999 3.15726 16.1213 2.87868C15.8427 2.6001 15.512 2.37913 15.1481 2.22836C14.7841 2.0776 14.394 2 14 2C13.606 2 13.2159 2.0776 12.8519 2.22836C12.488 2.37913 12.1573 2.6001 11.8787 2.87868C11.6001 3.15726 11.3791 3.48797 11.2284 3.85195C11.0776 4.21593 11 4.60603 11 5V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V6H15V17C15 17.7956 14.6839 18.5587 14.1213 19.1213C13.5587 19.6839 12.7956 20 12 20C11.2044 20 10.4413 19.6839 9.87868 19.1213C9.31607 18.5587 9 17.7956 9 17V5C9 3.67392 9.52678 2.40215 10.4645 1.46447C11.4021 0.526784 12.6739 0 14 0V0Z" fill="#0093CD" />
        </svg>,
      content: <IndexAttachment type="customers" />
    },
    {
      title: "Products",
      icon: <ProductsIcon />,
      content: "Products"
    },
    {
      title: "Brands",
      icon:
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z" stroke="#0093CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17 19C18.6569 19 20 17.6569 20 16C20 14.3431 18.6569 13 17 13C15.3431 13 14 14.3431 14 16C14 17.6569 15.3431 19 17 19Z" stroke="#0093CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7 19C8.65685 19 10 17.6569 10 16C10 14.3431 8.65685 13 7 13C5.34315 13 4 14.3431 4 16C4 17.6569 5.34315 19 7 19Z" stroke="#0093CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
      content: <IndexBrand type="customers" />
    },
    {
      title: "Submissions",
      icon:
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.75 2C18.3201 1.99993 18.869 2.2163 19.2858 2.60537C19.7025 2.99444 19.956 3.52721 19.995 4.096L20 4.25V19.748C20.0001 20.3181 19.7837 20.867 19.3946 21.2838C19.0056 21.7005 18.4728 21.954 17.904 21.993L17.75 21.998H6.25C5.67987 21.9981 5.13098 21.7817 4.71425 21.3926C4.29751 21.0036 4.04402 20.4708 4.005 19.902L4 19.748V4.25C3.99993 3.67987 4.2163 3.13098 4.60537 2.71425C4.99444 2.29751 5.52721 2.04402 6.096 2.005L6.25 2H17.75ZM17.75 3.5H6.25C6.06876 3.50001 5.89366 3.56564 5.75707 3.68477C5.62048 3.80389 5.53165 3.96845 5.507 4.148L5.5 4.25V19.748C5.5 20.128 5.782 20.442 6.148 20.491L6.25 20.498H17.75C17.9312 20.498 18.1063 20.4324 18.2429 20.3132C18.3795 20.1941 18.4684 20.0296 18.493 19.85L18.5 19.748V4.25C18.5 4.06876 18.4344 3.89366 18.3152 3.75707C18.1961 3.62048 18.0316 3.53165 17.852 3.507L17.75 3.5ZM7 15.749C7 15.5501 7.07902 15.3593 7.21967 15.2187C7.36032 15.078 7.55109 14.999 7.75 14.999H16.25C16.4489 14.999 16.6397 15.078 16.7803 15.2187C16.921 15.3593 17 15.5501 17 15.749C17 15.9479 16.921 16.1387 16.7803 16.2793C16.6397 16.42 16.4489 16.499 16.25 16.499H7.75C7.55109 16.499 7.36032 16.42 7.21967 16.2793C7.07902 16.1387 7 15.9479 7 15.749ZM7 7.749C7 7.55009 7.07902 7.35932 7.21967 7.21867C7.36032 7.07802 7.55109 6.999 7.75 6.999H16.25C16.4489 6.999 16.6397 7.07802 16.7803 7.21867C16.921 7.35932 17 7.55009 17 7.749C17 7.94791 16.921 8.13868 16.7803 8.27933C16.6397 8.41998 16.4489 8.499 16.25 8.499H7.75C7.55109 8.499 7.36032 8.41998 7.21967 8.27933C7.07902 8.13868 7 7.94791 7 7.749ZM7 11.749C7 11.5501 7.07902 11.3593 7.21967 11.2187C7.36032 11.078 7.55109 10.999 7.75 10.999H16.25C16.4489 10.999 16.6397 11.078 16.7803 11.2187C16.921 11.3593 17 11.5501 17 11.749C17 11.9479 16.921 12.1387 16.7803 12.2793C16.6397 12.42 16.4489 12.499 16.25 12.499H7.75C7.55109 12.499 7.36032 12.42 7.21967 12.2793C7.07902 12.1387 7 11.9479 7 11.749Z" fill="#0093CD" />
        </svg>,
      content: "Submissions"
    },
    {
      title: "Changes",
      icon:
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 18V19.5H19.845C19.4258 19.973 18.9107 20.3514 18.334 20.61C17.7572 20.8686 17.1321 21.0016 16.5 21C15.307 20.9986 14.1632 20.5241 13.3196 19.6804C12.476 18.8368 12.0014 17.693 12 16.5H10.5C10.4976 17.72 10.8678 18.9117 11.5613 19.9155C12.2547 20.9193 13.2383 21.6873 14.3802 22.1168C15.5222 22.5462 16.768 22.6166 17.9511 22.3185C19.1341 22.0204 20.1979 21.3681 21 20.4487V22.5H22.5V18H18ZM16.5 10.5C15.6476 10.5044 14.8057 10.6895 14.03 11.0431C13.2544 11.3967 12.5625 11.9107 12 12.5513V10.5H10.5V15H15V13.5H13.155C13.5743 13.027 14.0893 12.6486 14.6661 12.39C15.2428 12.1314 15.868 11.9984 16.5 12C17.6931 12.0014 18.8368 12.4759 19.6805 13.3196C20.5241 14.1632 20.9986 15.307 21 16.5H22.5C22.498 14.9093 21.8652 13.3843 20.7405 12.2596C19.6157 11.1348 18.0907 10.502 16.5 10.5Z" fill="#0093CD" />
          <path d="M9 21H4.5V18H6V16.5H4.5V12.75H6V11.25H4.5V7.5H6V6H4.5V3H18V9H19.5V3C19.5 2.60218 19.342 2.22064 19.0607 1.93934C18.7794 1.65804 18.3978 1.5 18 1.5H4.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V6H1.5V7.5H3V11.25H1.5V12.75H3V16.5H1.5V18H3V21C3 21.3978 3.15804 21.7794 3.43934 22.0607C3.72064 22.342 4.10218 22.5 4.5 22.5H9V21Z" fill="#0093CD" />
        </svg>,
      content: "Changes"
    }
  ]

  return <TabComponent headers={pageConfig.headers} tabs={tabs}></TabComponent>;
}

export default EditCustomer;
