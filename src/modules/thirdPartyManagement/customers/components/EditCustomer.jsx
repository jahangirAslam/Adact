import { TabComponent } from "@comps/components";
import IndexBrand from "@mods/commons/brands/IndexBrand";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import LocationIndex from "@mods/commons/locations/IndexLocation";
import EditCompany from "@mods/thirdPartyManagement/companies/components/EditCompany";
import { Row } from "antd";
import { Setting } from "react-iconly";
import { useParams } from "react-router-dom";
import ContactIcon from "../../../../containers/components/menu/icons/ContactIcon";
import LocationIcon from "../../../../containers/components/menu/icons/LocationIcon";
import ProductsIcon from "../../../../containers/components/menu/icons/ProductsIcon";
import SummaryIcon from "../../../../containers/components/menu/icons/SummaryIcon";
import ThirdPartyIcon from "../../../../containers/components/menu/icons/ThirdPartyIcon";
import AcountSetting from "../../../commons/Account Setting/AcountSetting";
import Business from "../../../commons/Business/Business";
import IndexProduct from "../../../commons/product/IndexProduct";
import Submission from "../../../products/allProducts/components/editProduct/submission/recipe/Submission";

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
      icon: <ThirdPartyIcon />,
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
      title: "Account Setting",
      icon: <Setting />,
      content: <AcountSetting id={id} type="customers" />
    },
  

    {
      title: "Products",
      icon: <ProductsIcon />,
      content: <IndexProduct type="customers" />
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
      content: <Submission type="customers" />
    }
    // {
    //   title: "Changes",
    //   icon:
    //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <path d="M18 18V19.5H19.845C19.4258 19.973 18.9107 20.3514 18.334 20.61C17.7572 20.8686 17.1321 21.0016 16.5 21C15.307 20.9986 14.1632 20.5241 13.3196 19.6804C12.476 18.8368 12.0014 17.693 12 16.5H10.5C10.4976 17.72 10.8678 18.9117 11.5613 19.9155C12.2547 20.9193 13.2383 21.6873 14.3802 22.1168C15.5222 22.5462 16.768 22.6166 17.9511 22.3185C19.1341 22.0204 20.1979 21.3681 21 20.4487V22.5H22.5V18H18ZM16.5 10.5C15.6476 10.5044 14.8057 10.6895 14.03 11.0431C13.2544 11.3967 12.5625 11.9107 12 12.5513V10.5H10.5V15H15V13.5H13.155C13.5743 13.027 14.0893 12.6486 14.6661 12.39C15.2428 12.1314 15.868 11.9984 16.5 12C17.6931 12.0014 18.8368 12.4759 19.6805 13.3196C20.5241 14.1632 20.9986 15.307 21 16.5H22.5C22.498 14.9093 21.8652 13.3843 20.7405 12.2596C19.6157 11.1348 18.0907 10.502 16.5 10.5Z" fill="#0093CD" />
    //       <path d="M9 21H4.5V18H6V16.5H4.5V12.75H6V11.25H4.5V7.5H6V6H4.5V3H18V9H19.5V3C19.5 2.60218 19.342 2.22064 19.0607 1.93934C18.7794 1.65804 18.3978 1.5 18 1.5H4.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V6H1.5V7.5H3V11.25H1.5V12.75H3V16.5H1.5V18H3V21C3 21.3978 3.15804 21.7794 3.43934 22.0607C3.72064 22.342 4.10218 22.5 4.5 22.5H9V21Z" fill="#0093CD" />
    //     </svg>,
    //   content: "Changes"
    // }
  ]

  return <TabComponent headers={pageConfig.headers} tabs={tabs}></TabComponent>;
}

export default EditCustomer;
