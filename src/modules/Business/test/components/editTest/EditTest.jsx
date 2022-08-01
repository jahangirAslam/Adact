import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../request";
import IndexSubmission from "../submission/IndexSubmission";
import ContactDetails from "./ContactDetails";
import Details from './Details';
import LocationIndex from "@mods/commons/locations/IndexLocation";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import AcountSetting from "../../../../commons/Account Setting/AcountSetting";
import ActivityLog from "../../../../componentManagement/chemicalCompounds/components/edits/ActivityLog";
import SummaryIcon from "../../../../../containers/components/menu/icons/SummaryIcon";
import ContactIcon from "../../../../../containers/components/menu/icons/ContactIcon";
import LocationIcon from "../../../../../containers/components/menu/icons/LocationIcon";
import SettingsIcon from "../../../../../containers/components/menu/icons/SettingsIcon";




const pageConfig = {
    headers: {
        title: "Adact Medical",
        breadcrumb: [
          
            {
                name: "Your Business",
                path: "/settings/business"

            },
            {
                name: "Adact Medical",
            }
        ]
    }

}

const EditTest = () => {
    const { id } = useParams();
    const [loader, setLoader] = useState(true);

    const [data, setData] = useState({
        object: null,
        dependencies: []
    });



    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    const getData = () => {
        makeRequest(setLoader, getItem, id, onSuccess, onError);
    }

    const onSuccess = (res) => {
        setData(res);
    }


    const tabs = [
        {
            title: "Summary ",
            icon: <SummaryIcon/>,
            content: <Details data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Contact Details  ",
            icon: <ContactIcon />,
            content: <ContactDetails data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Locations ",
            icon: <LocationIcon />,
            content: <LocationIndex data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Contacts ",
            icon: <ContactIcon />,
            content: <ContactIndex data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Account Setting  ",
            icon: <SettingsIcon />,
            content: <AcountSetting data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Submission ",
            icon:
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.75 2C18.3201 1.99993 18.869 2.2163 19.2858 2.60537C19.7025 2.99444 19.956 3.52721 19.995 4.096L20 4.25V19.748C20.0001 20.3181 19.7837 20.867 19.3946 21.2838C19.0056 21.7005 18.4728 21.954 17.904 21.993L17.75 21.998H6.25C5.67987 21.9981 5.13098 21.7817 4.71425 21.3926C4.29751 21.0036 4.04402 20.4708 4.005 19.902L4 19.748V4.25C3.99993 3.67987 4.2163 3.13098 4.60537 2.71425C4.99444 2.29751 5.52721 2.04402 6.096 2.005L6.25 2H17.75ZM17.75 3.5H6.25C6.06876 3.50001 5.89366 3.56564 5.75707 3.68477C5.62048 3.80389 5.53165 3.96845 5.507 4.148L5.5 4.25V19.748C5.5 20.128 5.782 20.442 6.148 20.491L6.25 20.498H17.75C17.9312 20.498 18.1063 20.4324 18.2429 20.3132C18.3795 20.1941 18.4684 20.0296 18.493 19.85L18.5 19.748V4.25C18.5 4.06876 18.4344 3.89366 18.3152 3.75707C18.1961 3.62048 18.0316 3.53165 17.852 3.507L17.75 3.5ZM7 15.749C7 15.5501 7.07902 15.3593 7.21967 15.2187C7.36032 15.078 7.55109 14.999 7.75 14.999H16.25C16.4489 14.999 16.6397 15.078 16.7803 15.2187C16.921 15.3593 17 15.5501 17 15.749C17 15.9479 16.921 16.1387 16.7803 16.2793C16.6397 16.42 16.4489 16.499 16.25 16.499H7.75C7.55109 16.499 7.36032 16.42 7.21967 16.2793C7.07902 16.1387 7 15.9479 7 15.749ZM7 7.749C7 7.55009 7.07902 7.35932 7.21967 7.21867C7.36032 7.07802 7.55109 6.999 7.75 6.999H16.25C16.4489 6.999 16.6397 7.07802 16.7803 7.21867C16.921 7.35932 17 7.55009 17 7.749C17 7.94791 16.921 8.13868 16.7803 8.27933C16.6397 8.41998 16.4489 8.499 16.25 8.499H7.75C7.55109 8.499 7.36032 8.41998 7.21967 8.27933C7.07902 8.13868 7 7.94791 7 7.749ZM7 11.749C7 11.5501 7.07902 11.3593 7.21967 11.2187C7.36032 11.078 7.55109 10.999 7.75 10.999H16.25C16.4489 10.999 16.6397 11.078 16.7803 11.2187C16.921 11.3593 17 11.5501 17 11.749C17 11.9479 16.921 12.1387 16.7803 12.2793C16.6397 12.42 16.4489 12.499 16.25 12.499H7.75C7.55109 12.499 7.36032 12.42 7.21967 12.2793C7.07902 12.1387 7 11.9479 7 11.749Z" fill="#0093CD" />
        </svg>,
             content: <IndexSubmission />
        },
        {
            title: "Activity logs ",
            icon: <SettingsIcon />,
            content: <ActivityLog data={data.object} dependencies={data.dependencies} />
        },
        
        


    ]

    const onError = (res) => {
        // handle call failed error
    }

    if (data.length === 0) {
        return "";
    }
    return <TabComponent headers={pageConfig.headers} tabs={tabs} loader={loader}></TabComponent>;

}

export default EditTest;
